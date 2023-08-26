const mongo = require("mongoose");

categoriesSchema = new mongo.Schema({
  name: { type: String, required: true },
});

exports.categoriesSchema = categoriesSchema;
