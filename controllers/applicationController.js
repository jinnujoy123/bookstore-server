const applications=require('../models/appicationModel')

// add application
exports.addApplicationController=async(req,res)=>{
    console.log('inside addApplicationController');
    const {fullname,email,qualification,phone,coverLetter,jobTitle,jobId}=req.body
    const resume=req.file.filename
    try{
        const applicatiionDetails=await applications.findOne({email,jobId})
        if(applicatiionDetails){
            res.status(409).json("you have already applied for this Job!!!")
        }else{
            const newApplication=new applications({fullname,email,qualification,phone,coverLetter,resume,jobTitle,jobId})
            await newApplication.save()
            res.status(200).json(newApplication)
        }
    }catch(err){
        res.status(500).json(err)
    }
}
// get application
exports.getApplicationController=async(req,res)=>{
    console.log('inside getApplicationController');
   
    try{
        const applicatiionDetails=await applications.find()
        
            res.status(200).json(applicatiionDetails)
       
        
    }catch(err){
        res.status(500).json(err)
    }
}