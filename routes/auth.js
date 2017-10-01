var express = require("express");
var router  = express.Router();
var passport = require("passport");
var user = require("../modules/user");



// AUTH ROUTES
//REGISTER ROUTE
router.get("/register",function(req,res){
    res.render("register.ejs");
});

//REGISTER - POST ROUTE
router.post("/register", function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    user.register(new user({username:username}), password, function(err,user){
        if(err){
            console.log(err);
            req.flash("error",err.message);
            res.redirect("back");
        }
        else{
            passport.authenticate("local")(req,res,function(){
                req.flash("success","Welcome" + user.username + "." +"Login to get started");
                res.redirect("/login");
            });
        }
    });
});
//LOGIN ROUTE
router.get("/login",function(req,res){
    res.render("login.ejs");
});

//LOGIN POST ROUTE
router.post("/login", passport.authenticate("local",{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}),function(req,res){
    
});

//LOGOUT ROUTE
router.get("/logout", function(req,res){
    req.logout();
    res.redirect("/");
});

//MIDDLEWARE    
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please login first.!");
    res.redirect("/login");
}

module.exports = router;