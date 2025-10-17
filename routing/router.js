const express=require('express')
// Router - middleware interface
const userController = require('../controllers/userController')
const bookController = require('../controllers/bookController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const multerConfig = require('../middleware/imageMulterMiddleware')

const router=express.Router()  


// register
router.post('/register',userController.registerController)
// login
router.post('/login',userController.loginController)
// google login
router.post('/google-login',userController.googleLoginController)
// add-book
router.post('/add-book',jwtMiddleware,multerConfig.array('uploadImages',3),bookController.addBookController)



module.exports=router