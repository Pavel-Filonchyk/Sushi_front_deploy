import fs from 'fs'
import ServiceImg from '../Service/ServiceImg.js'

class ControllerImg {                                       
    async createImg (req, res) {
        const imgDB = await Image.create({
            "images": ServiceImg.getImg()
        }) 
        imgDB.images.forEach(img => {
            return fs.writeFileSync(`./images/${img.contentType}`, img.data)
        })
        res.json(req.body)
    }
}

export default new ControllerImg()
