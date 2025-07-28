const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const { controllers } = require("chart.js");
const userControllers = require("../controllers/users.js");

router.get("/signup", userControllers.renderSignupForm)

// Signup
router.post("/signup", wrapAsync(userControllers.signup));

//render Signup Form
router.get("/login", userControllers.renderLoginForm);

router.post("/login",saveRedirectUrl,passport.authenticate("local", {failureRedirect: '/login',failureFlash: true}), userControllers.login);


router.get("/logout",userControllers.logout)

module.exports = router;
