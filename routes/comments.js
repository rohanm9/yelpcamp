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
//edit and update comment
router.get('/:comment_id/edit',checkcommentownership,function(req,res){
    Comment.findOne({_id:req.params.comment_id},function(err,comment){
        if(err){
            console.log(err);
        }else{
            res.render('./comments/edit',{campground_id:req.params.id,comment:comment});
        }
    });
});
router.post('/:comment_id',checkcommentownership,function(req,res){
    Comment.findOneAndUpdate({_id:req.params.comment_id},req.body.comment,function(err,comment){
        if(err){
            console.log(err);
        }else{
            res.redirect('/campgrounds/'+req.params.id);
        }
    });
});

//delete comment
router.get('/:comment_id/delete',checkcommentownership,function(req,res){
    Comment.findOneAndDelete({_id:req.params.comment_id},function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect('/campgrounds/'+req.params.id);
        }
    });
});
//authorisation
function checkcommentownership(req,res,next){
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
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports=router;
