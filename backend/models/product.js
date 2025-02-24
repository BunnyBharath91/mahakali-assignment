"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // Define associations here
      Product.hasMany(models.ProductOrder, { foreignKey: "product_id" });
    }
  }

  Product.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      item_id: { type: DataTypes.BIGINT, allowNull: false, defaultValue: 2657 },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      user_address_id: { type: DataTypes.INTEGER },
      product_name: { type: DataTypes.STRING, allowNull: false },
      slug: { type: DataTypes.STRING, allowNull: false, unique: true },
      brand_id: { type: DataTypes.INTEGER },
      is_made_in_india: { type: DataTypes.BOOLEAN, defaultValue: false },
      is_hand_made: { type: DataTypes.BOOLEAN, defaultValue: false },
      is_cash_on_delivery: { type: DataTypes.BOOLEAN, defaultValue: false },
      is_customizable_product: { type: DataTypes.BOOLEAN, defaultValue: false },
      delivery_by: { type: DataTypes.TINYINT, defaultValue: 1 },
      return_policy_id: { type: DataTypes.TINYINT },
      exchange_policy_id: { type: DataTypes.TINYINT },
      hsn_code_id: { type: DataTypes.INTEGER },
      gst: { type: DataTypes.DECIMAL(5, 2) },
      tag_price: { type: DataTypes.DECIMAL(10, 2) },
      iz_commission: { type: DataTypes.DECIMAL(5, 2) },
      no_return_discount: { type: DataTypes.DOUBLE(8, 2), defaultValue: 0.0 },
      insurance_premium: { type: DataTypes.TINYINT, defaultValue: 0 },
      variant_type: { type: DataTypes.TINYINT, defaultValue: 0 },
      minimum_purchase_quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
      low_stock_quantity_warning: { type: DataTypes.INTEGER, defaultValue: 0 },
      product_description: { type: DataTypes.TEXT },
      product_specification: { type: DataTypes.TEXT },
      thumbnail_image_url: { type: DataTypes.STRING },
      pdf_specification_url: { type: DataTypes.STRING },
      video_url: { type: DataTypes.STRING },
      is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
      status: {
        type: DataTypes.ENUM("0", "1", "2"),
        allowNull: false,
        defaultValue: "0",
      },
      is_daily_deals: { type: DataTypes.BOOLEAN, defaultValue: false },
      is_new: { type: DataTypes.BOOLEAN, defaultValue: false },
      is_highlights: { type: DataTypes.BOOLEAN, defaultValue: false },
      created_on: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_on: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      popularity_score: { type: DataTypes.INTEGER, defaultValue: 0 },
      deleted_at: { type: DataTypes.DATE },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
      timestamps: false,
    }
  );

  return Product;
};
