const express = require("express");
const { uploadMedia, deleteMedia } = require("../../services/cloudinary");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const upload = multer({
    dest: "uploads/"
});


// routes
// upload
router.post("/upload", upload.single("file"), async (req, res) => {
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
router.delete("/delete/:id", async (req, res) => {
    try{
        const { id } = req.params;

        if(!id) {
            return res.status(404).json({
                message: "Id is required",
            });
        }
        const result = await deleteMedia(id);
        res.status(200).json({
            data: result,
        })

    } catch(err){
        console.log(err);
        res.status(500).json({
            message: "Error in deleting file",
        });
    }
})
// bulk upload
router.post("/bulk-upload", upload.array("files", 5), async (req, res) => {
    try{
        const singlePromises = req.files.map(item => uploadMedia(item.path));
        

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

module.exports = router;
