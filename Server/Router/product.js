const router = require("express").Router();
const productModel = require("../models/Product");
const { verifyTokenAndAdmin } = require("./verify");

//Create
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new productModel(req.body);

  try {
    const saveProduct = await newProduct.save();
    res.status(200).json(saveProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Update
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete
router.delete('/:id',verifyTokenAndAdmin,async (req,res)=>{
    try {
         const deletedProduct=await productModel.findByIdAndDelete(req.params.id)
         res.status(200).json("product as been deleted successfully")
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get product
router.get('/',async(req,res)=>{
    const qNew=req.query.new;
    const qCategory=req.query.category; 
    try {
      let products;
      if(qNew){
         products=await productModel.find().sort({createdAt:-1}).limit(1)
      }else if(qCategory){
         products= await productModel.find({categories:{
            $in:[qCategory]
         }})
      } else{
        products= await productModel.find()  
      }

      res.status(200).json(products)

    } catch (error) { 
        res.status(500).json(error)
    }
 
})

//Get single product
router.get('/single/:id',async (req,res)=>{
    try {
        const singleProduct=await productModel.findById(req.params.id)
        res.status(200).json(singleProduct)
        
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;
