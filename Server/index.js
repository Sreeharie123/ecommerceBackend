
//import the express library 
const express=require('express')
const app=express()

//import the mongoose library
const mongoose=require('mongoose')
//Connect the database
mongoose.connect("mongodb+srv://sreehari:c5iFWjdqMfB9EuW0@cluster0.kvba6c4.mongodb.net/shop").then((data)=>{
    console.log("Database connected")
}).catch(error=>{console.log(error)})

 
















//listening the port 4000
app.listen(4000,()=>{
    console.log("Server running on port 4000 ")
}) 