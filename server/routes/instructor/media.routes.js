const cors = require("cors")
const express = require("express");
const app = express();
const { uploadMedia, deleteMedia } = require("../../services/cloudinary");
const router = express.Router();
const multer = require("multer");

const upload = multer({
    dest: "uploads/"
});


app.use(cors());
app.use(express.json());
// routes
// upload
app.post("/upload", upload.single("file"), async (req, res) => {
    try{
        const result = await uploadMedia(req.file.path);
        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error uploading file"
        });
    }
})
// delete
app.delete("/delete/:id", async (req, res) => {
    try{
        const { id } = req.params;

        if(!id) {
            return res.status(404).json({
                message: "Id is required",
            })
        }
        const result = await deleteMedia(id);
        res.status(200).json({
            data: result,
        })

    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "Error in deleting file",
        })
    }
})
// bulk upload
app.post("/uploads", upload.array("files", 10), async (req, res) => {
    try{
        const singlePromises = req.files.map((item) => {
            uploadMedia(item.path);
        });

        const result = await Promise.all(singlePromises);

        res.status(200).json({
            data: result,
        })
        
    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "Error in uploading mulitple files",
        });
    }
})

app.listen(3000, () => {
    console.log("Server is running");
})
