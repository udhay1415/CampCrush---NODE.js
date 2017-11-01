var express = require("express");
var router  = express.Router();
var Campground = require("../modules/campground");

router.get("/", function(req,res){
    res.render("landing.ejs");
});

//INDEX ROUTE
router.get("/campgrounds", function(req,res){
    Campground.find({},function(err,campgrounds){
        if(err){
            console.log(err);
        }
        else{
           res.render("campgrounds/campground.ejs",{campgrounds:campgrounds,currentUser:req.user}); 
        }
    });
});

//NEW ROUTE
router.get("/campgrounds/new",isLoggedIn, function(req,res){
    res.render("campgrounds/new.ejs");
});

//CREATE
router.post("/campgrounds",isLoggedIn, function(req,res){
    var newCampground = {
        author : {
            id: req.user._id,
            username: req.user.username
        },
        name : req.body.name,
        image: req.body.image
    };
    Campground.create(newCampground,function(err,campgrounds){
        if(err){
            console.log(err);
            res.render("back");
        }
        else{
            req.flash("success","Campground successfully created");
            res.redirect("/campgrounds");
        }
    });
});

//SHOW ROUTE
router.get("/campgrounds/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/show.ejs",{campground:campground});
        }
    });
});

//EDIT ROUTE
router.get("/campgrounds/:id/edit",isOwner,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        res.render("campgrounds/edit.ejs",{campground:campground});
    });
});

//UPDATE ROUTE
router.put("/campgrounds/:id",isOwner,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,campground){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            req.flash("success","Campground successfully updated");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DELETE ROUTE
router.delete("/campgrounds/:id",isOwner,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
        }
        req.flash("success","Campground successfully deleted");
        res.redirect("/campgrounds");
        
    });
});

//MIDDLEWARE to check whether the user is logged in or not
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please login first.!");
    res.redirect("/login");
}

//MIDDLEWARE FOR AUTHORIZATION
function isOwner(req,res,next){
    //check if the user is logged in
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,campground){
            if(err){
                res.redirect("back");
            }
            else{
                // console.log(req.user);
                if(campground.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error","You don't have permissions to do this.!");
                    res.redirect("/campgrounds");
                }
            }
        });
    }else{
        req.flash("error","Please login first.!");
        res.redirect("back");
    }
}
module.exports = router;