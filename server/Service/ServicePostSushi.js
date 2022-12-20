import fs from 'fs'
import data from '../data/data.js'


class ServicePostSushi {
    postElems () {

        try {
            const results = data.data
            const images = fs.readdirSync('./images')
            const http = "http://localhost:3001/image/"
            const addUrl = results.map((item, index) => {
                return {
                    "sushiName":  item.sushiName,
                    "amount": item.amount,
                    "weight": item.weight,
                    "price": item.price,
                    "counter": item.counter,
                    "type": item.type,
                    "url": http + images[index]
                }
            })
            return addUrl  
        } catch (e) {
            console.log(e)
        }
    }
}
export default new ServicePostSushi();







