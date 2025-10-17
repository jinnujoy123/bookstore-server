const books=require('../models/bookModel')

// add book
exports.addBookController = async (req,res)=>{
    console.log("Inside addBookController");

    console.log(req.body);
    const{title,author,noOfPages,imageUrl,price,discountPrice,abstract,publisher,language,isbn,category}=req.body
    const userEmail=req.payload
console.log(req.files);
    req.files.map(item=>uploading.push(item.filename))
    console.log((title,author,noOfPages,imageUrl,price,discountPrice,abstract,publisher,language,isbn,category,uploadImages));
    try{
        const existingBook=await books.findOne({title,userMail})
        if(existingBook){
            res.status(401).json("You have already added the book")
        }else{
            const newBook=new books({
                title,author,noOfPages,imageUrl,price,discountPrice,abstract,publisher,language,isbn,category,uploadImages,userEmail
            })
            await newBook.save()
            res.status(200).json(newBook)
        }
    }catch(err){
res.status(500).json(err)
    }
    res.status(200).json("request received")
}