import Sushi from "../Schemes/Sushi.js"

class ControllerGetSushi {  
                                         
    async getAll(req, res) {                                                                                      
        try {
            const find = await Sushi.find()
            const length = find.length
            const sushi = find[length -1]                 
            res.status(200).json(sushi.SushiElems)                                    
        } catch (e){
            res.status(500).json(e)                                       
        }
    }
}

export default new ControllerGetSushi()