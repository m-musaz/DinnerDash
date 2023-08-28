import mongoose from "mongoose";
const mongo = mongoose;

const itemSchema = new mongo.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: mongo.Schema.Types.Decimal128 },
  photoUrl: { type: String },
  categories: [{ type: mongo.Schema.Types.ObjectId, ref: "categories" }],
  active: { type: Boolean, default: true },
});
const itemModel = mongo.model("items", itemSchema);

export default itemModel;
