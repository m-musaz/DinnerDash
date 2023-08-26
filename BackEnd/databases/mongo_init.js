const mongo = require("mongoose");
const { categoriesSchema } = require("../models/Categories");
const { itemSchema } = require("../models/items");
const { ordersSchema } = require("../models/Orders");
const { userSchema } = require("../models/Users");

function init_db() {
  mongo
    .connect("mongodb://127.0.0.1:27017/dinnerDash")
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.log("Connection Failed", err);
    });

  const db = mongo.connection;

  db.once("open", () => {
    db.collection("orders").drop();
    db.collection("categories").drop();
    db.collection("items").drop();
    db.collection("users").drop();
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

  const Orders = new orders({
    status: false,
    items: [{ itemId: item._id, quantity: 5 }],
  });

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

exports.init_db = init_db;
