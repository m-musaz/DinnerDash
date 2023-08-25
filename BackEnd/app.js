const { Decimal128 } = require("bson");
const mongo = require("mongoose");
const { title } = require("process");

console.log("Working till here");
mongo
  .connect("mongodb://127.0.0.1:27017/dinnerDash")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Connection Failed", err);
  });

function init_db() {
  categoriesSchema = new mongo.Schema({
    name: { type: String, required: true },
  });
  itemSchema = new mongo.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Decimal128 },
    photoUrl: { type: String },
    categories: [{ type: mongo.Schema.Types.ObjectId, ref: "categories" }],
  });
  ordersSchema = new mongo.Schema({
    orderTimeStamp: { type: Date, default: Date.now() },
    status: { type: Boolean, required: true },
    items: [{ type: mongo.Schema.Types.ObjectId, ref: "items" }],
  });
  userSchema = new mongo.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    displayName: String,
    orders: [{ type: mongo.Schema.Types.ObjectId, ref: "orders" }],
  });

  const categories = mongo.model("categories", categoriesSchema);
  const orders = mongo.model("orders", ordersSchema);
  const items = mongo.model("items", itemSchema);
  const users = mongo.model("users", userSchema);

  const Categories = new categories({ name: "Continental" });

  const item = new items({
    title: "Biryani",
    description: "Sindhi Biryani",
    price: 123,
    categories: [Categories?._id],
  });

  const Orders = new orders({ status: false, items: [item?._id] });

  const Users = new users({
    fullName: "Muhammad Musa Zulfiqar",
    email: "mz@hotmail.com",
    orders: [Orders._id],
  });

  async function getres() {
    const res1 = await Categories.save();
    const res2 = await item.save();
    const res3 = await Orders.save();
    const res4 = await Users.save();
    console.log(res1);
    console.log(res2);
    console.log(res3);
    console.log(res4);
  }
  getres();
}

// init_db();
