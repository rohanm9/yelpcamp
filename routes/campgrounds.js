//campground routes
var express=require('express');
var router=express.Router();
var Campground=require('../models/camp');
var middleObj=require('../middleware');

//all campgrounds
router.get('/',function(req,res){
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render('campgrounds/index',{campgrounds:allCampgrounds});
        }
    });
});
//adding new campground
router.get('/new',middleObj.isLoggedIn,function(req,res){
    res.render('campgrounds/new');
});
router.post('/',middleObj.isLoggedIn,function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var descr=req.body.descr;
    var author={
        id: req.user._id,
        username: req.user.username
    };
    var newCampground={name:name,image:image,author:author,description:descr};
    Campground.create(newCampground,function(err,newCamp){
        if(err){
            console.log(err);
        }
        else{
            res.redirect('campgrounds');
        }
    });
});
//edit and update campground
router.get('/:id/edit',middleObj.checkCampgroundOwnerShip,function(req,res){
    Campground.findOne({_id:req.params.id},function(err,foundCampground){
        res.render('campgrounds/edit',{campground:foundCampground});
    });

});
router.post('/:id',middleObj.checkCampgroundOwnerShip,function(req,res){
    Campground.findOneAndUpdate({_id:req.params.id},req.body.campground,function(err,updatedcampground){
            res.redirect('/campgrounds/'+req.params.id)
    });
});
//to show all the comments related to a specific campground
router.get('/:id',function(req,res){
    Campground.findOne({_id:req.params.id}).populate('comments').exec(function(err,foundCampground){
       if(err){
           console.log(err);
       }
       else{
           res.render('./campgrounds/show',{campground:foundCampground});
       }
    });
});

//delete campground
router.get('/:id/delete',middleObj.checkCampgroundOwnerShip,function(req,res){
    Campground.findOneAndDelete({_id:req.params.id},function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect('/campgrounds');
        }
    });
});

module.exports=router;
