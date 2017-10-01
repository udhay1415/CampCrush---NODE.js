var express = require("express");
var app = express();

//BODY PARSER CONFIG
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

//PASPORT CONFIG
var passport = require("passport");
var LocalStrategy = require("passport-local");

//MONGOOSE CONGIG
var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp");
// mongoose.connect("mongodb://udhay1415:raje6629@ds155132.mlab.com:55132/camp_crush"); 

//REQUIRE MODULES
var flash = require("connect-flash");
var user = require("./modules/user");
var Campground = require("./modules/campground");
var Comment = require("./modules/comment");
var seedDB = require("./seed");
//METHOD-OVERRIDE CONFIG
var methodOverride= require("method-override");
app.use(methodOverride("_method"));
app.use(flash());


//PASSPORT CONFIG
app.use(require("express-session")({
    secret:"ajjpooraje29",
    resave:false,
    saveUninitialized:false
}));

passport.use(new LocalStrategy(user.authenticate()));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


app.use(express.static("public"));
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

//seedDB();

//REQUIRE ROUTES
var campgroundRoute = require("./routes/campground");
var commentRoute = require("./routes/comment");
var authRoute = require("./routes/auth");

//SPECIFING APP TO USE THE REQUIRED ROUTES
app.use(campgroundRoute);
app.use(commentRoute);
app.use(authRoute);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started");
})