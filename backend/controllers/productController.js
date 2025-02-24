const { Product, ProductOrder, sequelize } = require("../models");

exports.getTotalProducts = async (req, res) => {
    try {
        const totalProducts = await Product.count();
        res.json({ totalProducts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTopProducts = async (req, res) => {
    try {
        const { filter } = req.query; // filter = 'orders' or 'revenue'

        let orderBy;
        if (filter === "revenue") {
            orderBy = [sequelize.literal("total_revenue"), "DESC"];
        } else {
            orderBy = [sequelize.literal("total_orders"), "DESC"];
        }

        const topProducts = await ProductOrder.findAll({
            attributes: [
                "product_id",
                [sequelize.fn("COUNT", sequelize.col("product_id")), "total_orders"],
                [sequelize.fn("SUM", sequelize.col("indiazona_price")), "total_revenue"]
            ],
            include: [
                {
                    model: Product,
                    attributes: [
                        ["product_name", "name"],
                        "tag_price",
                        "thumbnail_image_url"
                    ],
                    required: true // Ensure INNER JOIN (only products with orders are included)
                }
            ],
            group: [
                "Product.id",
                "product_id",
                "Product.product_name",
                "Product.tag_price",
                "Product.thumbnail_image_url"
            ],
            order: [orderBy],
            limit: 5,
        });

        res.json({ topProducts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
