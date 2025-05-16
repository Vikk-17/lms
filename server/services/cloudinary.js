const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config({
    path: "../.env"
})


// console.log(process.env.API_KEY)

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});


const uploadMedia = async (filePath) => {
    try{
        const result = await cloudinary.uploader.upload(
            filePath, {
                resource_type: "auto",
            }
        );
        console.log(result);
        return result;
    } catch(err){
        console.log(err);
        throw new Error("Can't upload Media");
    }
}

const deleteMedia = async (publicId) => {
    try{
        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: "video",
        });
        console.log(result);
        return result;
    } catch(err) {
        console.log(err);
        throw new Error("Failed to delete from cloudinary");
    }
}


// uploadMedia("trial.mp4");

// deleteMedia("kacoqongmh7cvocep9gc");

// module.exports = { uploadMedia, deleteMedia }