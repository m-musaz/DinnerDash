const express = require("express");
const router = express.Router();

//use similar functionality for admin roles
router.get("/profile", (req, res, next) => {
  if (req.user.role == "User") {
    console.log("This is a Normal User");
  }
  res.json({
    message: "You made it to the secure route",
    user: req.user,
    token: req.query.secret_token,
  });
});

exports.secureRoutes = router;
