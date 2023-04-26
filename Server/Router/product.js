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

module.exports = router;
