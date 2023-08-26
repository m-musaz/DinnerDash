const express = require("express");
const { categoriesRouter } = require("./categoriesRoutes");
const router = express.Router();

router.use("/categories", categoriesRouter);

exports.router = router;
