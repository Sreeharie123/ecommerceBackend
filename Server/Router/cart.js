const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verify");
const Cart = require("../models/Cart");
const router = require("express").Router();

//Create
router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Update
router.put("/:id", verifyTokenAndAuthorization, async (req,res) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      {
        new: true
      });
      res.status(200).json(updateCart)
  } catch (error) {
    res.status(500).json(error);
  }
});

 //Delete
router.delete('/:id',verifyTokenAndAuthorization,async(req,res)=>{
    try {
        const deletedCart=await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart deleted successfully")
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get User Cart
router.get('/find/:userId',verifyTokenAndAuthorization,async(req,res)=>{
    try {
        const cart=await Cart.findOne({userId:req.params.userId})
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get All
router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    
    try {
        const carts=await Cart.find()
        res.status(200).json(carts)
    } catch (error) {
        res.status(500).json(error)
    }
})




module.exports = router;