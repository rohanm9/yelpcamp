//comment routes
var express=require('express');
var Campground=require('../models/camp');
var Comment=require('../models/comment');
var router=express.Router({mergeParams:true});
router.get('/new',isLoggedIn,function(req,res){
    Campground.findOne({_id:req.params.id},function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            res.render('comments/new',{campground:campground});     
        }
    });
});
router.post('/',isLoggedIn,function(req,res){
    Campground.findOne({_id:req.params.id},function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            Comment.create(req.body.comment,function(err,newComment){
                if(err){
                    console.log(err);
                }
                else{
                    newComment.author.id=req.user._id;
                    newComment.author.username=req.user.username;
                    newComment.save();
                    campground.comments.push(newComment);
                    campground.save();
                    res.redirect('/campgrounds/'+req.params.id);
                }
            });    
        }
    });
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login'); 
}

module.exports=router;