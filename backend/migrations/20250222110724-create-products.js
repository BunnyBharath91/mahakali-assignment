"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("products", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      item_id: { type: Sequelize.BIGINT, allowNull: false, defaultValue: 2657 },
      user_id: { type: Sequelize.INTEGER, allowNull: false },
      user_address_id: { type: Sequelize.INTEGER },
      product_name: { type: Sequelize.STRING, allowNull: false },
      slug: { type: Sequelize.STRING, allowNull: false, unique: true },
      brand_id: { type: Sequelize.INTEGER },
      is_made_in_india: { type: Sequelize.BOOLEAN, defaultValue: false },
      is_hand_made: { type: Sequelize.BOOLEAN, defaultValue: false },
      is_cash_on_delivery: { type: Sequelize.BOOLEAN, defaultValue: false },
      is_customizable_product: { type: Sequelize.BOOLEAN, defaultValue: false },
      delivery_by: { type: Sequelize.TINYINT, defaultValue: 1 },
      return_policy_id: { type: Sequelize.TINYINT },
      exchange_policy_id: { type: Sequelize.TINYINT },
      hsn_code_id: { type: Sequelize.INTEGER },
      gst: { type: Sequelize.DECIMAL(5, 2) },
      tag_price: { type: Sequelize.DECIMAL(10, 2) },
      iz_commission: { type: Sequelize.DECIMAL(5, 2) },
      no_return_discount: { type: Sequelize.DOUBLE(8, 2), defaultValue: 0.0 },
      insurance_premium: { type: Sequelize.TINYINT, defaultValue: 0 },
      variant_type: { type: Sequelize.TINYINT, defaultValue: 0 },
      minimum_purchase_quantity: { type: Sequelize.INTEGER, defaultValue: 1 },
      low_stock_quantity_warning: { type: Sequelize.INTEGER, defaultValue: 0 },
      product_description: { type: Sequelize.TEXT },
      product_specification: { type: Sequelize.TEXT },
      thumbnail_image_url: { type: Sequelize.STRING },
      pdf_specification_url: { type: Sequelize.STRING },
      video_url: { type: Sequelize.STRING },
      is_active: { type: Sequelize.BOOLEAN, defaultValue: true },
      status: {
        type: Sequelize.ENUM("0", "1", "2"),
        allowNull: false,
        defaultValue: "0",
      },
      is_daily_deals: { type: Sequelize.BOOLEAN, defaultValue: false },
      is_new: { type: Sequelize.BOOLEAN, defaultValue: false },
      is_highlights: { type: Sequelize.BOOLEAN, defaultValue: false },
      created_on: { type: Sequelize.DATE, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
      updated_on: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      popularity_score: { type: Sequelize.INTEGER, defaultValue: 0 },
      deleted_at: { type: Sequelize.DATE },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("products");
  },
};
