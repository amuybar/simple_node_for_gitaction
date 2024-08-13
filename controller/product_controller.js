const Product = require("../model/product");

exports.getAll = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error);
  }
}
exports.createProduct = async (req, res) => {
  const { name, price, quantity } = req.body;
  if (!name || !price || !quantity) {
    return res.status(400).json({ message: "Please provide all the required fields" });
  }
  try { 
    const newProduct = new Product({ name, price, quantity });
    await newProduct.save();
    res.status(201).json(newProduct);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
}