const multer=require('multer')

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads')
        
        
    },
    filename:(req,file,cb)=>{
        cb(null,`image-${Date.now()}-${file.originalname}`)
    }
})

const fileFilter=(req,file,cb)=>{
    // image with png,jpg,jpeg
    if(file.mimetype=='image/png'||file.mimetype=='image/jpg'||file.mimetype=='image/jpeg'||file.mimetype=='image/webp'){
        cb(null,true)
       
        
    }else{
        cb(null,false)
        return cb(new Error("Accept only png,jpg,webp or jpeg files"))
    }
}

const multerConfig=multer({
    storage,
    fileFilter
})

module.exports=multerConfig