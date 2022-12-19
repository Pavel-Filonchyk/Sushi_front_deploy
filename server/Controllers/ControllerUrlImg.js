class ControllerUrlImg {                                       

    async getImages(req, res) {  
        const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl
        res.download('images/' + req.params.path)                
    }
}

export default new ControllerUrlImg();