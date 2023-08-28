import express from "express";
import mongoose from "mongoose";
import ordersModel from "../models/Orders.js";
import usersModel from "../models/Users.js";

const mongo = mongoose;
const userRouter = express.Router();

mongo
  .connect("mongodb://127.0.0.1:27017/dinnerDash")
  .then(() => {
    console.log("Connected to DB Item");
  })
  .catch((err) => {
    console.log("Connection Failed", err);
  });

// vew past orders
// save Order
userRouter.post("/save-order", async (req, res, next) => {
  const user_id = req.user._id;
  const order = req.body.order;

  const db_order = new ordersModel({
    status: false,
    items: order,
  });

  const user = await usersModel.findById(user_id);
  user.orders.push(db_order._id);

  try {
    await db_order.save();
    await user.save();
    res.status(201).send("Order and User Saved");
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred");
  }
});

userRouter.get("/get-orders", async (req, res, next) => {
  const user_id = req.user._id;
  const orders = await usersModel
    .findById(user_id)
    .select({ _id: 0, orders: 1 });
  res.json({
    user: req.user,
    orders: orders?.orders,
  });
});

export default userRouter;
