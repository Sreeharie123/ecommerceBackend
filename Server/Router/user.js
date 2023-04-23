const router=require('express').Router();
 
router.get('/usertest',(req,res)=>{
    res.send("userTest")
    console.log("hallo")
})


router.post('/userposttest',(req,res)=>{
    const username=req.body.username
    console.log(username)
    res.send(username)
})

module.exports = router