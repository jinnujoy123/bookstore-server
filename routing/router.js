const express=require('express')
// Router - middleware interface
const router=express.Router()  
const userController = require('../controllers/userController')

// register
router.post('/register',userController.registerController)


module.exports=router