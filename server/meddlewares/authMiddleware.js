import jwt from 'jsonwebtoken'
import data from '../config.js'

const authMiddleware = (req, res, next) => {
    const { secret } = data

    if (req.method === 'OPTIONS') {                  
        next()                                       
    }

    try {
        const token = req.headers.authorization.split(' ')[1]    
        console.log(token)
        if (!token) {
            return res.status(403).json({message: 'User not authorized'})
        }

        const decodedData = jwt.verify(token, secret)            
        req.user = decodedData                                    
    
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: 'User not authorized'})
    }
}

export default authMiddleware