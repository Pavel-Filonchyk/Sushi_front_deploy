import mongoose from 'mongoose'
import data from '../data/data.js'

const result = data.data.map(item => {
    console.log(item)
    return {
        "sushiName": String,
        "url": String,
        "amount": Number,
        "weight": Number,
        "price": Number,
        "counter": Number,
    }
})

const Sushi = new mongoose.Schema({          
    SushiElems: result
})

export default mongoose.model('Sushi', Sushi)
