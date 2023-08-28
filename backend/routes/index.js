const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { categoriesRouter } = require("./categoriesRoutes");
const { itemsRouter } = require("./itemRoutes");
const { authRouter } = require("./authRoutes");
const { secureRoutes } = require("./secureRoutes");
const router = express.Router();
require("../controllers/Auth");

router.use("/categories", categoriesRouter);
router.use("/items", itemsRouter);

router.use(
  "/user",
  passport.authenticate("jwt", { session: false }),
  secureRoutes
);

router.use("/", authRouter);

exports.router = router;
