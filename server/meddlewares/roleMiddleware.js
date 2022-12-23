import jwt from 'jsonwebtoken'
import data from '../config.js'

const roleMeddleware = (roles) => {        
    
    return function (req, res, next) {    

        const { secret } = data

        if (req.method === 'OPTIONS') {                   
            next()                                       
        }
        
        try {
            const token = req.headers.authorization.split(' ')[1]     
            console.log(token)
            if (!token) {
                return res.status(403).json({message: 'Пользователь не авторизован'})
            }
            
            const { roles: decodedData } = jwt.verify(token, secret)        
            console.log(decodedData )
            
            let hasRole = false
            decodedData.forEach(role => {                                  
                if (roles.includes(role)) {
                    hasRole = true
                }
            })
            if (!hasRole) {
                return res.status(403).json({message: 'У вас нет доступа'})
            }
            
            next()
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: 'Пользователь не авторизован'})
        }
    }
}

export default roleMeddleware