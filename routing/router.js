const express=require('express')
// Router - middleware interface
const userController = require('../controllers/userController')
const bookController = require('../controllers/bookController')
const jobController = require('../controllers/jobController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const multerConfig = require('../middleware/imageMulterMiddleware')
const adminJwtMiddleware = require('../middleware/adminJwtMiddleware')
const pdfMulterConfig = require('../middleware/pdfMulterMiddleware')
const applicationController = require('../controllers/applicationController')

const router=express.Router()  

// ========unauthorized user=================
// register
router.post('/register',userController.registerController)
// login
router.post('/login',userController.loginController)
// home-books
router.get('/home-books',bookController.getHomeBooksController)
// google login
router.post('/google-login',userController.googleLoginController)
// get all jobs
 router.get('/all-jobs',jobController.getAllJobsController)

// ================authorized user====================

// add-book
router.post('/add-book',jwtMiddleware,multerConfig.array('uploadImages',3),bookController.addBookController)
// all-books
router.get('/all-books',jwtMiddleware,bookController.getAllBooksController)
// view-book
router.get('/books/:id/view',jwtMiddleware,bookController.viewBookController)
// // get user books
router.get('/user-books',jwtMiddleware,bookController.getAllUserBooksController)
// get user bought books
router.get('/user-bought-books',jwtMiddleware,bookController.getAllUserBoughtBooksController)
// delete user books
router.delete('/user-books/:id/remove',jwtMiddleware,bookController.deleteUserBookController)
// user profile update
router.put('/user-profile/edit',jwtMiddleware,multerConfig.single('profile'),userController.userProfileEditController)
// post application
router.post('/application/add',jwtMiddleware,pdfMulterConfig.single('resume'),applicationController.addApplicationController)

// ------------admin-------------------------
// users-list
router.get('/all-users',adminJwtMiddleware,userController.getAllUsersController)
// list all books
router.get('/admin-all-books',adminJwtMiddleware,bookController.getAllBooksAdminController)
// approve book
router.put('/admin/book/approve',adminJwtMiddleware,bookController.updateBookStatusController)
// admin-profile-edit
router.put('/admin-profile/edit',adminJwtMiddleware,multerConfig.single('profile'),userController.adminProfileEditController)
// add-job
router.post('/admin/add-job',adminJwtMiddleware,jobController.addJobController)
// delete jobs
router.delete('/job/:id/remove',adminJwtMiddleware,jobController.removeJobController)
// get application
router.get('/all-applications',adminJwtMiddleware,applicationController.getApplicationController)

module.exports=router