const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/total-products", productController.getTotalProducts);
router.get("/top-products", productController.getTopProducts);

module.exports = router;
