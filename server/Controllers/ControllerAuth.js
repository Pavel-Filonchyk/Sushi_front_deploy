import bcrypt from 'bcryptjs'
import User from '../Schemes/User.js'
import Role from '../Schemes/Role.js'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import data from '../config.js'

const generateAccessToken = (id, roles) => {               
    const { secret } = data
    const payload = { id, roles }                          
                            
    return jwt.sign(payload, secret, {expiresIn: '24h'})    
}

class ControllerAuth {

    async registration (req, res) {
            console.log(req.body)
        try {
            const errors = validationResult(req)                                  
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Registration error', errors})
            }

            const {userName, password} = req.body                               
            const candidate = await User.findOne({userName})                     
            if (candidate) {
                return res.status(400).json({message: 'User with this name exists'})
            }
            
            const hashPassword = bcrypt.hashSync(password, 8)                    
            
            const userRole = await Role.findOne({value: 'USER'})                 
            //const user = new User({userName, password: hashPassword, roles: [userRole.value]})   
            
            //await user.save()
            const userCreate = await User.create({userName, password: hashPassword, roles: [userRole.value]})
            const token = generateAccessToken(userCreate._id, userCreate.roles) 
                return res.json(token)                                            
        
            } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login (req, res) {
        try {
            const { userName, password } = req.body  
            const user = await User.findOne({userName})                           
            if ( !user) {
                return res.status(400).json({message: `User ${userName} is not found`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)     
            if ( !validPassword ) {
                return res.status(400).json({message: 'Wrong password entered'})
            }
            const token = generateAccessToken(user._id, user.roles)               
            console.log({token})
            return res.json({token})

        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    } 

    async getUsers (req, res) {

        try {
            // const userRole = new Role()                    
            // const adminRole = new Role({value: "ADMIN"})
            // await userRole.save()
            // await adminRole.save()
            // res.json("server work")

            const users = await User.find()                  
            res.json(users)
        } catch (e) {
            
        }
    }
}

export default new ControllerAuth()