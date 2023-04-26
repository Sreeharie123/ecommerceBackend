const router = require("express").Router();
const User = require("../models/User");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../Router/verify");
const cryptoJs = require("crypto-js");

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    const encryptPassword = cryptoJs.AES.encrypt(
      req.body.password,
      process.env.KEY
    ).toString();
    req.body.password = encryptPassword;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    User.findOneAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get User
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get AllUsers
router.get("/",verifyTokenAndAdmin, async (req, res) => {
  const query=req.query.new
  try {
    const users = query ? await User.find().sort({_id:-1}).limit(query) :await User.find()

    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});


//Get UserStatus
router.get('/status',verifyTokenAndAdmin,async(req,res)=>{
  const date=new Date()
  const lastYear= new Date(date.setFullYear(date.getFullYear()-1))
  try {

     const data=await User.aggregate([
      {$match: {createdAt:{$gte:lastYear}}},
      {$project: {month:{$month:"$createdAt"}}},
      {$group:{_id:"$month",total:{$sum:1}}}
     ])
     res.status(200).send(data)
    
  } catch (error) {
    res.status(500).json(error)
    
  } 
})

module.exports = router; 