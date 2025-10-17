// import express, cors ,dotenv
// Loads .env file contents into process.env by default
require('dotenv').config()
const express=require('express')
const cors=require('cors')

const router=require('./routing/router')
require('./db/connection')


// create server
const bookstoreServer = express()

bookstoreServer.use((req, res, next) => {
  console.log('--- Incoming request ---');
  console.log('Method:', req.method, 'URL:', req.originalUrl);
  console.log('Content-Type:', req.headers['content-type']);
  console.log('Authorization header present:', !!req.headers['authorization']);
  next();
});
// enable cors protocol in server app
bookstoreServer.use(cors())
// parse json 
bookstoreServer.use(express.json())
bookstoreServer.use(router)


// create port
const PORT =3000

// to run server in PORT

bookstoreServer.listen(PORT,()=>{
    console.log("Bookstore server started at PORT : ", PORT);
})

// resolving http request
bookstoreServer.get('/',(req,res)=>{
    res.status(200).send('<h1>Bookstore Server started!!!!and waiting for client requests!!!</h1>')
})


