const mongo = require("mongoose");
const bcrypt = require("bcrypt");

userSchema = new mongo.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  displayName: String,
  password: { type: String, required: true },
  orders: [{ type: mongo.Schema.Types.ObjectId, ref: "orders" }],
  role: { type: String, default: "User" },
});

userSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 5);
  this.password = hash;

  next();
});

userSchema.methods.isPasswordValid = async function (password) {
  const compare = await bcrypt.compare(password, this.password);

  return compare;
};

const users = mongo.model("users", userSchema);

exports.userModel = users;
