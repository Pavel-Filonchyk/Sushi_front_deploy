import Router from 'express'
import ControllerPostSushi from './Controllers/ControllerPostSushi.js'
import ControllerImg from './Controllers/ControllerImg.js';
import ControllerUrlImg from './Controllers/ControllerUrlImg.js';
import ControllerGetSushi from './Controllers/ControllerGetSushi.js'
const router = new Router()

router.get('/list', ControllerGetSushi.getAll)
router.post('/create', ControllerPostSushi.postAll)
router.get('/image/:path', ControllerUrlImg.getImages)
router.get('/posts/:id', ControllerImg.createImg)

export default router;