const jobs=require('../models/jobModel')

// add job
exports.addJobController=async(req,res)=>{
    const {title,location,jobType,salary,qualification,experience,description}=req.body
    try{
        const jobDetails=await jobs.findOne({title,location})
        if(jobDetails){
            res.status(401).json("Job already added!!! Please add another.")
        }else{
            const newJob=new jobs({title,location,jobType,salary,qualification,experience,description})
            await newJob.save()
            res.status(200).json(newJob)
        }
    }catch(err){
        res.status(500).json(err)
    }
}
// get all jobs
exports.getAllJobsController=async(req,res)=>{
    console.log("Inside getAllJobController");
    const searchKey=req.query.search
        const query={
        title:{$regex : searchKey,$options:'i'},
        }
 try{
const allJobs=await jobs.find(query)
res.status(200).json(allJobs)
 }  catch(err){
     res.status(500).json(err)
 } 
}
// update
// delete
exports.removeJobController=async(req,res)=>{
    console.log("Inside removeJobController");
    const {id}=req.params 
    try{
        const deleteJob=await jobs.findByIdAndDelete({_id:id})
        res.status(200).json(deleteJob)
    }catch(err){
        res.status(500).json(err)
    }
    
 }
 //"_id": "6902e6718e7cba8d05086aa5"