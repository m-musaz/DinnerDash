const { Decimal128 } = require("bson");
const mongo = require("mongoose");

itemSchema = new mongo.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Decimal128 },
  photoUrl: { type: String },
  categories: [{ type: mongo.Schema.Types.ObjectId, ref: "categories" }],
});

exports.itemSchema = itemSchema;
