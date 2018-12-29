var middleObj={};
var Campground=require('../models/camp.js');
var Comment=require('../models/comment.js');
middleObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}
middleObj.checkCampgroundOwnerShip=function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findOne({_id:req.params.id},function(err,foundCampground){
            if(err){
                console.log(err);
            }
            else{
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect('back');
                }
            }
        });
    }else{
        res.redirect('back');
    }
}
middleObj.checkcommentownership=function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findOne({_id:req.params.comment_id},function(err,foundComment){
            if(err){
                res.redirect('back');
            }else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect('back');
                }
            }
        });
    }
    else{
        res.redirect('back');
    }
}
module.exports=middleObj;
