const mongo = require("mongoose");

userSchema = new mongo.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  displayName: String,
  orders: [{ type: mongo.Schema.Types.ObjectId, ref: "orders" }],
});

const users = mongo.model("users", userSchema);

exports.userModel = users;
