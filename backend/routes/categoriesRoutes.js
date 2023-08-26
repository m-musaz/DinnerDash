const express = require("express");
const mongo = require("mongoose");
const { categoriesModel } = require("../models/Categories");

const router = express.Router();

mongo
  .connect("mongodb://127.0.0.1:27017/dinnerDash")
  .then(() => {
    console.log("Connected to DB cc");
  })
  .catch((err) => {
    console.log("Connection Failed", err);
  });

router.get("/get-all", (req, res) => {
  categoriesModel
    .find({})
    .select({ name: 1, _id: 0 })
    .distinct("name")
    .then((result) => {
      console.log(result);
      res.status(201).json({ status: "success", data: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(404);
    });
});

router.post("/add-category", (req, res) => {
  const Categories = new categoriesModel({ name: req.body.name });
  Categories.save()
    .then(() => {
      res.status(201).json({ status: "success" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
    });
});

exports.categoriesRouter = router;
