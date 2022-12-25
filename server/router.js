import Router from 'express'
import { check } from 'express-validator'
import ControllerPostSushi from './Controllers/ControllerPostSushi.js'
import ControllerImg from './Controllers/ControllerImg.js'
import ControllerUrlImg from './Controllers/ControllerUrlImg.js'
import ControllerGetSushi from './Controllers/ControllerGetSushi.js'
import ControllerCartSushi from './Controllers/ControllerCartSushi.js'
import ControllerAuth from './Controllers/ControllerAuth.js'
import authMiddleware from './meddlewares/authMiddleware.js'
import roleMiddleware from './meddlewares/roleMiddleware.js'

const router = new Router()

router.get('/list',  ControllerGetSushi.getAll)
router.post('/cart', authMiddleware, ControllerCartSushi.postCart)
router.post('/create', ControllerPostSushi.postAll)
router.get('/image/:path', ControllerUrlImg.getImages)
router.get('/posts/:id', ControllerImg.createImg)

router.post('/registration', [
    check('userName', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль не должен быть меньше 4 и больше 10 символов').isLength({min: 4, max:10})
], ControllerAuth.registration)
router.post('/login', ControllerAuth.login)

router.get('/users', roleMiddleware(['USER']), ControllerAuth.getUsers) 

export default router
