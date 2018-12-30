var middleObj={};
var Campground=require('../models/camp.js');
var Comment=require('../models/comment.js');
middleObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error','Login first !!');
    res.redirect('/login');
}
middleObj.checkCampgroundOwnerShip=function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findOne({_id:req.params.id},function(err,foundCampground){
            if(err){
                req.flash('error','Something want wrong !!');
                res.redirect('back');
            }
            else{
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash('error',"You don't have permission to that !!");
                    res.redirect('back');
                }
            }
        });
    }else{
        req.flash('error','Login first !!');
        res.redirect('back');
    }

}
middleObj.checkcommentownership=function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findOne({_id:req.params.comment_id},function(err,foundComment){
            if(err){
                req.flash('error','Something want wrong !!');
                res.redirect('back');
            }else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash('error',"You don't have permission to that !!");
                    res.redirect('back');
                }
            }
        });
    }
    else{
        req.flash('error','Login first !!');
        res.redirect('back');
    }
}
module.exports=middleObj;
