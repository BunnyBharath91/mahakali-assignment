"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ProductOrder extends Model {
    static associate(models) {
      // Define associations here
      ProductOrder.belongsTo(models.Product, { foreignKey: "product_id" });
    }
  }

  ProductOrder.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      product_variant_id: { type: DataTypes.INTEGER, allowNull: false },
      product_id: { type: DataTypes.INTEGER, allowNull: false },
      order_id: { type: DataTypes.INTEGER, allowNull: false },
      quantity: { type: DataTypes.INTEGER, allowNull: false },
      tax_amount_id: { type: DataTypes.INTEGER, allowNull: false },
      transaction_type: { type: DataTypes.STRING },
      address_id: { type: DataTypes.INTEGER },
      logistics_tracking_link: { type: DataTypes.TEXT },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        onUpdate: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      coupon_discount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
      bank_discount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
      no_return_discount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
      cod_charges: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
      shipping_charges: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
      packing_charges: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
      handling_charges: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
      net_amount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
      gross_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      indiazona_price: { type: DataTypes.DECIMAL(10, 2) },
      checkout_logistics_price: { type: DataTypes.DECIMAL(10, 2) },
      awb_number: { type: DataTypes.STRING },
      nimbus_label: { type: DataTypes.STRING },
      nimbus_manifest: { type: DataTypes.STRING },
      product_order_code: { type: DataTypes.STRING, allowNull: false },
      cancelled_at: { type: DataTypes.DATE },
    },
    {
      sequelize,
      modelName: "ProductOrder",
      tableName: "product_orders",
      timestamps: false,
    }
  );

  return ProductOrder;
};
