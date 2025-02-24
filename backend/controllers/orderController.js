const { ProductOrder, Product, sequelize } = require("../models");

exports.getTotalOrders = async (req, res) => {
    try {
        const totalOrders = await ProductOrder.count();
        res.json({ totalOrders });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRecentOrders = async (req, res) => {
    try {
        const recentOrders = await ProductOrder.findAll({
            attributes: [
                ["id", "order_id"],
                ["created_at", "created_at"],
                ["indiazona_price", "amount"],
                ["transaction_type", "order_type"]
            ],
            include: [
                {
                    model: Product,
                    attributes: [["product_name", "name"]],
                    required: true // ✅ Fix for NULL values
                }
            ],
            order: [["created_at", "DESC"]],
            limit: 10
        });

        res.json({ recentOrders });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.getTotalSales = async (req, res) => {
    try {
        const totalSales = await ProductOrder.sum("indiazona_price"); // Sums all indiazona_price values
        res.json({ totalSales: totalSales || 0 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getSalesGraph = async (req, res) => {
    try {
        const { filter, year } = req.query;

        let dateFormat;
        let groupBy;
        let whereCondition = {};

        if (year) {
            whereCondition.created_at = {
                [Op.gte]: new Date(`${year}-01-01T00:00:00Z`),
                [Op.lte]: new Date(`${year}-12-31T23:59:59Z`),
            };
        }

        if (filter === "weekly") {
            dateFormat = "%Y-%W"; // Year-Week
            groupBy = sequelize.fn("strftime", "%Y-%W", sequelize.col("created_at"));
        } else if (filter === "monthly") {
            dateFormat = "%Y-%m"; // Year-Month
            groupBy = sequelize.fn("strftime", "%Y-%m", sequelize.col("created_at"));
        } else {
            dateFormat = "%Y-%m-%d"; // Year-Month-Day (default: daily)
            groupBy = sequelize.fn("strftime", "%Y-%m-%d", sequelize.col("created_at"));
        }

        const salesData = await ProductOrder.findAll({
            attributes: [
                [groupBy, "date"],
                [sequelize.fn("SUM", sequelize.col("indiazona_price")), "total_sales"],
            ],
            where: whereCondition,
            group: ["date"],
            order: [["date", "ASC"]],
        });

        res.json({ salesData });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};