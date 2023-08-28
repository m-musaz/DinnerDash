import express from "express";
import mongoose from "mongoose";
import itemModel from "../models/Items.js";

const mongo = mongoose;
const itemsRouter = express.Router();

mongo
  .connect("mongodb://127.0.0.1:27017/dinnerDash")
  .then(() => {
    console.log("Connected to DB Item");
  })
  .catch((err) => {
    console.log("Connection Failed", err);
  });

itemsRouter.get("/get-all", (req, res) => {
  itemModel
    .find({})
    .then((result) => {
      console.log(result);
      res.status(201).json({ status: "success", data: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(404);
    });
});

itemsRouter.get("/category-items", (req, res) => {
  const reqCategories = req.body;
  itemModel
    .find({ categories: { $all: reqCategories } })
    .select({ __v: 0 })
    .then((result) => {
      res.status(201).json({ status: "success", data: result });
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

export default itemsRouter;
