import fs from 'fs'
import * as uuid from 'uuid'

class ServiceImg {
    getImg () {
        try {
            const allFiles = fs.readdirSync("./data/img")
            const fileNames = allFiles.map(name => {
                return uuid.v4() + '.jpg'
            })
            const images = allFiles.map((image, index) => {
                return {
                    "data": fs.readFileSync(`./data/img/${image}`),             // read like buffer
                    "contentType": fileNames[index]
                }
            })
            return images
        } catch (e) {
            console.log(e)
        }
    }
}
export default new ServiceImg();