const router=require('express').Router();
const User=require('../models/User')
const {verifyToken,verifyTokenAndAuthorization }=require('../Router/verify')
const cryptoJs=require('crypto-js')

router.put('/:id',verifyTokenAndAuthorization,async(req,res)=>{

    if(req.body.password){
        const encryptPassword = cryptoJs.AES.encrypt(
            req.body.password,
            process.env.KEY
          ).toString()
          req.body.password=encryptPassword
    }

  try {
    const updatedUser= await User.findByIdAndUpdate(req.params.id,{
        $set:req.body
    },{new:true})
    res.status(200).json(updatedUser)
     
  } catch (error) {
    res.status(500).json(error)
  } 
   
})

module.exports = router