var express = require("express");
var router  = express.Router();
var Comment = require("../modules/comment");
var Campground = require("../modules/campground");

//COMMENTS NEW ROUTE
router.get("/campgrounds/:id/comments/new",isLoggedIn, function(req,res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }
        else{
            res.render("comment/new.ejs",{campground:campground});
        }
    });
    
});

//COMMENT CREATE ROUTE
router.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){
    Campground.findById(req.params.id, function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            Comment.create(req.body.comment, function(err,comment){
                if(err){
                    req.flash("error",err);
                    console.log(err);
                }
                else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    console.log(req.user);
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success","Review added.!");
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        }
    });
   
});

//COMMENT EDIT ROUTE
router.get("/campgrounds/:id/comments/:comment_id/edit",isCommentOwner,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            res.redirect("back");
        }
        else{
            Comment.findById(req.params.comment_id,function(err,comment){
                if(err){
                    res.redirect("back");
                }
                else{
                    res.render("comment/edit.ejs",{campground:campground,comment:comment});
                }
            });
        }
    });
});

//COMMENT UPDATE ROUTE
router.put("/campgrounds/:id/comments/:comment_id",isCommentOwner,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment, function(err,updatedComment){
        if(err){
            res.redirect("back");
        }
        else{
            req.flash("success","Review updated!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//COMMENT DELETE ROUTE
router.delete("/campgrounds/:id/comments/:comment_id",isCommentOwner,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("back");
        }
        else{
            req.flash("success","Comment deleted!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//MIDDLEWARE
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please login first.!");
    res.redirect("/login");
}

//MIDDLEWARE FOR AUTHORIZATION
function isCommentOwner(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,comment){
            if(err){
                res.redirect("back");
            }
            else{
                if(req.user._id.equals(comment.author.id)){
                    next();
                }
                else{
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error","Please login first.!");
        res.redirect("back");
    }
}
module.exports = router;