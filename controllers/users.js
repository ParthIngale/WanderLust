const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const { controllers } = require("chart.js");
const userControllers = require("../controllers/users.js");

// SignUp form
module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
             req.flash("success", "Welcome to WanderLust!");
    res.redirect("/listings");
        })
   
    }
    catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
    
}
//Render Signup Form

module.exports.renderSignupForm =(req, res) => {
    res.render("users/signup.ejs");  
}
// Render Login Form
module.exports.renderLoginForm =  (req, res) => {
    res.render("users/login.ejs");
}

// Login Form
module.exports.login = async (req, res) => {
        req.flash("success", "Welcome back to WanderLust!");
        const redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
}
    

// logout
module.exports.logout =  (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    })
}