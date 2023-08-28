import mongoose from "mongoose";
const mongo = mongoose;

const categoriesSchema = new mongo.Schema({
  name: { type: String, required: true },
});
const categoriesModel = mongo.model("categories", categoriesSchema);

export default categoriesModel;
