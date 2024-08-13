const Product = require("../model/product");

// Controller to get all products
exports.getAll = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error: Unable to fetch products" });
  }
};

// Controller to create a new product
exports.createProduct = async (req, res) => {
  const { name, price, quantity } = req.body;

  // Check for missing fields
  if (!name || !price || !quantity) {
    return res
      .status(400)
      .json({
        message:
          "Please provide all the required fields: name, price, and quantity.",
      });
  }

  try {
    // Create a new product instance
    const newProduct = new Product({ name, price, quantity });

    // Save the product to the database
    await newProduct.save();

    // Respond with the created product and a 201 status code
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: "Server error: Unable to create product" });
  }
};
