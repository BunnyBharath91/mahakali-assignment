const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/total-orders", orderController.getTotalOrders);
router.get("/total-sales", orderController.getTotalSales);
router.get("/sales-graph", orderController.getSalesGraph);
router.get("/recent-orders", orderController.getRecentOrders)

module.exports = router;
