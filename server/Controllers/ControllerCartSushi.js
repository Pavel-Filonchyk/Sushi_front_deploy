import Invoice from "../Schemes/Invoice.js"
import User from '../Schemes/User.js'
import fs from 'fs'

class ControllerCartSushi {                                       
    async postCart(req, res) {                                                     
        fs.writeFileSync('./postCart/postCart.json', JSON.stringify(req.body))
        try {
            const bill = await Invoice.create({ 
                invoice: req.body
            }) 
            console.log(bill.invoice)                           
            res.status(200).json(bill.invoice)                                    
        } catch (e){
            res.status(500).json(e)                                       
        }
    }
}

export default new ControllerCartSushi()