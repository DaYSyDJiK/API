const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");


/**
 * Routes d'authentification (login/logout).
 * @module routes/authRoutes
 */

router.post("/login", (req, res, next) => {
  console.log("🔥 POST /login HIT");
  next();
});
router.post("/login", authController.login);
router.get("/logout", authController.logout);

module.exports = router;
