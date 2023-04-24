const router = require("express").Router();
const User = require("../models/User");
const cryptoJs = require("crypto-js");
const jwt=require('jsonwebtoken')

//Register
router.post("/register", check, async (req, res) => {
  const encryptPassword = cryptoJs.AES.encrypt(
    req.body.password,
    process.env.KEY
  ).toString();
  const newUser = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: encryptPassword,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

async function check(req, res, next) {
  const userEmail = await User.findOne({ email: req.body.email });
  const userName = await User.findOne({ userName: req.body.userName });
  if (userEmail) return res.status(500).send("Already existed email");
  if (userName) return res.status(500).send("Already existed the userName");
  next();
}

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(500).json("email is not valid");
    const hashedPassword = cryptoJs.AES.decrypt(user.password, process.env.KEY);
    const realPass = hashedPassword.toString(cryptoJs.enc.Utf8);
    if(realPass !== req.body.password) return res.status(401).json("invalid password");

    const accessToken=jwt.sign({
      id:user._id,
      isAdmin:user.isAdmin
    },process.env.JWT_KEY,{expiresIn:'3d'})

    const{password,...rest}=user._doc;
    res.status(200).json({...rest,accessToken})


  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
