const router = require("express").Router();
const productController = require("../controller/product_controller");

router.get('/api', productController.getAll);
router.post('/api', productController.createProduct);


module.exports = router;