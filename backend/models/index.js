"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const config = require("../config/config.js").development; // Always use SQLite config
const db = {};

const sequelize = new Sequelize(config); // Initialize Sequelize with SQLite config

// Dynamically import all models
fs.readdirSync(__dirname)
  .filter((file) => file !== basename && file.endsWith(".js") && !file.endsWith(".test.js"))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Set up associations if defined in models
Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
