"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("product_orders", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      product_variant_id: { type: Sequelize.INTEGER, allowNull: false },
      product_id: { type: Sequelize.INTEGER, allowNull: false },
      order_id: { type: Sequelize.INTEGER, allowNull: false },
      quantity: { type: Sequelize.INTEGER, allowNull: false },
      tax_amount_id: { type: Sequelize.INTEGER, allowNull: false },
      transaction_type: { type: Sequelize.STRING },
      address_id: { type: Sequelize.INTEGER },
      logistics_tracking_link: { type: Sequelize.TEXT },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        onUpdate: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      coupon_discount: { type: Sequelize.DECIMAL(10, 2), defaultValue: 0.0 },
      bank_discount: { type: Sequelize.DECIMAL(10, 2), defaultValue: 0.0 },
      no_return_discount: { type: Sequelize.DECIMAL(10, 2), defaultValue: 0.0 },
      cod_charges: { type: Sequelize.DECIMAL(10, 2), defaultValue: 0.0 },
      shipping_charges: { type: Sequelize.DECIMAL(10, 2), defaultValue: 0.0 },
      packing_charges: { type: Sequelize.DECIMAL(10, 2), defaultValue: 0.0 },
      handling_charges: { type: Sequelize.DECIMAL(10, 2), defaultValue: 0.0 },
      net_amount: { type: Sequelize.DECIMAL(10, 2), defaultValue: 0.0 },
      gross_amount: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
      indiazona_price: { type: Sequelize.DECIMAL(10, 2) },
      checkout_logistics_price: { type: Sequelize.DECIMAL(10, 2) },
      awb_number: { type: Sequelize.STRING },
      nimbus_label: { type: Sequelize.STRING },
      nimbus_manifest: { type: Sequelize.STRING },
      product_order_code: { type: Sequelize.STRING, allowNull: false },
      cancelled_at: { type: Sequelize.DATE },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("product_orders");
  },
};
