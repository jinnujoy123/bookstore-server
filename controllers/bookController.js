const books=require('../models/bookModel');
const { createSearchIndex } = require('../models/userModel');

// add book
exports.addBookController = async (req,res)=>{
    console.log("Inside addBookController");

    console.log(req.body);
    const{title,author,noOfPages,imageUrl,price,discountPrice,abstract,publisher,language,isbn,category}=req.body
    const userMail=req.payload
console.log(req.files);
var uploadImg=[]
    req.files.map(item=>uploadImg.push(item.filename))
    console.log((title,author,noOfPages,imageUrl,price,discountPrice,abstract,publisher,language,isbn,category,uploadImg,userMail));
    try{
        const existingBook=await books.findOne({title,userMail})
        if(existingBook){
            res.status(401).json("You have already added the book")
        }else{
            const newBook=new books({
                title,author,noOfPages,imageUrl,price,discountPrice,abstract,publisher,language,isbn,category,uploadImg,userMail
            })
            await newBook.save()
            res.status(200).json(newBook)
        }
    }catch(err){
res.status(500).json(err)
    }
    res.status(200).json("request received")
}

// get home books
exports.getHomeBooksController=async(req,res)=>{
    console.log("Inside getHomeBooks");
    try{
        const allHomeBooks=await books.find().sort({_id:-1}).limit(4)
        res.status(200).json(allHomeBooks)
    }catch(err){
        res.status(500).json(err)
    }
}

exports.getAllBooksController=async(req,res)=>{
    console.log("Inside AllBooks");
    const searchKey=req.query.search
    const email=req.payload
    const query={
        title:{$regex : searchKey,$options:'i'},
        userMail:{$ne:email}
    }
    try{
        const allBooks=await books.find(query)
        res.status(200).json(allBooks)
    }catch(err){
        res.status(500).json(err)
    }
}

// view Book

exports.viewBookController = async (req,res)=>{
    console.log("Inside viewBookController");
    const {id}=req.params 
      
    console.log(id);
    try{
        const viewBook =await books.findById({_id:id})
            res.status(200).json(viewBook)
            console.log(viewBook);
            
        
    }catch(err){
        res.status(500).json(err)
    }
    
}

// get user books

exports.getAllUserBooksController=async(req,res)=>{
    console.log("Inside getAllUserBooks");
     const email=req.payload     
    try{
        const allUserBooks=await books.find({userMail:email})
        res.status(200).json(allUserBooks)
    }catch(err){
        res.status(500).json(err)    }
}

// user bought books
exports.getAllUserBoughtBooksController=async(req,res)=>{
    console.log("Inside getAllUserBoughtBooks");
     const email=req.payload   
    
    try{
        const allUserBoughtBooks=await books.find( { bought:email})
        res.status(200).json(allUserBoughtBooks)
    }catch(err){
        res.status(500).json(err)    }
}

// delete user uploaded books
exports.deleteUserBookController=async(req,res)=>{
    console.log("Inside deleteUserBookController");
    // get book id
    const {id}=req.params
    console.log(id);
    try{
        await books.findByIdAndDelete({_id:id})
        res.status(200).json("Deleted suucessfully")
    }catch(err){
        res.status(500).json(err)
    }
    
}


// --------admin----------------

// get all books to admin
exports.getAllBooksAdminController = async (req,res)=>{
    console.log("Inside getAllBooksAdminController");
     const email=req.payload
        try{
        const allBooksAdmin=await books.find( {email:{$ne:email}})
        res.status(200).json(allBooksAdmin)
    }catch(err){
        res.status(500).json(err)    }
}

// edit book status
exports.updateBookStatusController=async(req,res)=>{
    console.log("inside updateBookStatusController");
    // get data to be updated from req , body , payload 
    const {_id,title,author,noOfPages,imageUrl,price,discountPrice,abstract,publisher,language,isbn,category,uploadImg,status,userMail,bought}=req.body      
    
    try{
        const updateBook=await books.findByIdAndUpdate({_id},{title,author,noOfPages,imageUrl,price,discountPrice,abstract,publisher,language,isbn,category,uploadImg,status:"approved",userMail,bought},{new:true})
        // await updateBooks.save() // needed only for findOneAndUpdate
        res.status(200).json(updateBook)
        }catch(err){
        res.status(500).json(err)
    }
}
