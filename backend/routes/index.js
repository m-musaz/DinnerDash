const express = require("express");
const { categoriesRouter } = require("./categoriesRoutes");
const { itemsRouter } = require("./itemRoutes");
const router = express.Router();

router.use("/categories", categoriesRouter);
router.use("/items", itemsRouter);

exports.router = router;
