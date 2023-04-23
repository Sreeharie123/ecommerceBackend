const router=require('express').Router();
const User=require('../models/User')
const cryptoJs=require('crypto-js')


//Register
router.post('/register',check,async (req,res)=>{
  const encryptPassword = cryptoJs.AES.encrypt(req.body.password,process.env.KEY).toString()
   const newUser= new User(
    {
        userName:req.body.userName,
        email:req.body.email,
        password:encryptPassword
    });
    try{
      const savedUser =await newUser.save()
       res.status(201).json(savedUser)
    }
    catch(err){
      res.status(500).json(err)
    }
  
}) 

async function check(req,res,next){
   const userEmail=await User.findOne({email:req.body.email})
   const userName= await User.findOne({userName:req.body.userName})
   if(userEmail) return res.status(500).send('Already existed email')
   if(userName) return res.status(500).send('Already existed the userName')
     next()
}


//Login
router.post('/login',async(req,res)=>{

})

module.exports = router 