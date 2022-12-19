import mongoose from 'mongoose'
import fs from 'fs'

const allFiles = fs.readdirSync("./data/img")
const images = allFiles.map(image => {
    return {
        data: Buffer,
        contentType: String
    }
})
const Image = new mongoose.Schema({          
    images: images
})

export default mongoose.model('Image', Image)
