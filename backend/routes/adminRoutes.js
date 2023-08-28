import express from "express";
import mongoose from "mongoose";
import ordersModel from "../models/Orders.js";
import usersModel from "../models/Users.js";

const mongo = mongoose;
const adminRouter = express.Router();

mongo
  .connect("mongodb://127.0.0.1:27017/dinnerDash")
  .then(() => {
    console.log("Connected to DB Item");
  })
  .catch((err) => {
    console.log("Connection Failed", err);
  });

// create new item
// modify existing item // assign items to categories // retire item (active)
// create categories

// vew all orders of all users
// change any order status to something else
// cannot change personal data other than self

export default adminRouter;
