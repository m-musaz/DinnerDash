const mongo = require("mongoose");

categoriesSchema = new mongo.Schema({
  name: { type: String, required: true },
});
const categories = mongo.model("categories", categoriesSchema);

exports.categoriesModel = categories;
