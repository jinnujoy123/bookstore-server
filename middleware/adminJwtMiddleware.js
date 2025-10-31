const jwt = require("jsonwebtoken");


const adminJwtMiddleware=(req,res,next)=>{
    console.log("inside adminJwt Middleware");
    const token=req.headers.authorization.split(" ")[1]
    
       console.log(token);
      try{
         const jwtResponse=jwt.verify(token,process.env.JWTSECRET)
       console.log(jwtResponse);
       req.payload=jwtResponse.userMail 
       req.role=jwtResponse.role
       if(jwtResponse.role=='admin'){           
        next()               
       }else{              
        res.status(401).json("Unauthorised user!!!")
       }
      }catch(err){
        console.log("inalid");
        
        res.status(401).json("Invalid Token",err)
      }
}

module.exports=adminJwtMiddleware