import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"
import path from "path"
const uploadOnCloudinary = async (file) => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    // Normalize path to use forward slashes (fixes Windows backslash issue)
    const normalizedPath = path.resolve(file).replace(/\\/g, '/')
    try {
        const result = await cloudinary.uploader.upload(normalizedPath)
        fs.unlinkSync(file)
        return result.secure_url
    } catch (error) {
        if (fs.existsSync(file)) fs.unlinkSync(file)
        console.log(error)
    }
}

export default uploadOnCloudinary