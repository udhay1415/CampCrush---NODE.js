var mongoose = require("mongoose");
var Campground = require("./modules/campground");
var Comment = require("./modules/comment");
var data = [
        {
            name: "Rishikesh Valley – Rishikesh", 
            image: "https://www.holidify.com/blog/wp-content/uploads/2016/08/rishikesh-valley.jpg",
            description : "Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit. Nullam id dolor id nibh ultricies vehicula ut id elit.."
            
        },
        {
            name: "Kipling Camp – Madhya Pradesh", 
            image: "https://www.holidify.com/blog/wp-content/uploads/2016/08/kipling-camp.jpg",
            description : "Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit."
        }
    ];
function seedDB(){
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }
        console.log("campground removed");
        // data.forEach(function(seed){
        //     Campground.create(seed,function(err,campground){
        //         if(err){
        //             console.log(err);
        //         }
        //         else{
        //             console.log("campground created");
                    
        //             Comment.create({
        //                 text: "hey, osm place",
        //                 author: "raje"
        //             },function(err,comment){
        //                 if(err){
        //                     console.log(err);
        //                 }
        //                 else{
                            
        //                     campground.comments.push(comment);
        //                     campground.save();
        //                     console.log(campground);
        //                 }
        //             });
        //         }
        //     });
        // });
    });
}


module.exports = seedDB;