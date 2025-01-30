const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user"); 
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");
const { saveRedirectUrl } = require("../middleware");
const userController=require("../controllers/users.js")


router.get("/logout", userController.logout);

router.route("/signup")
.get( userController.renderSignupForm)
.post(wrapAsync(userController.signup)
);

router.route("/login")
.get(userController.renderLoginForm )
.post(saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),
    userController.login
   
);

module.exports = router;
