import mongoose from 'mongoose'
import fs from 'fs'

const obj = fs.readFileSync('./postCart/postCart.json')    // затем можно обойти каждый элемент массива и присвоить тип
//console.log(JSON.parse(obj))

const Invoice = new mongoose.Schema({          
    invoice : {
        "check": Array,
        "totalPrice": Number,
        "userName": String
    }
})

export default mongoose.model('Invoice', Invoice)