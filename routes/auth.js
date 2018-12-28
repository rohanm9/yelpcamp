
////AUTH ROUTES
var express=require('express');
var router=express.Router();
var User=require('../models/user');
var passport=require('passport');

router.get('/',function(req,res){
    res.render('landing');
});

//SIGN UP
router.get('/register',function(req,res){
    res.render('register');
});


router.post('/register',function(req,res){
    User.register({username:req.body.username},req.body.password,function(err,user){
        if(err){
            console.log(err);
        }   
        passport.authenticate('local')(req,res,function(){
            res.redirect('/campgrounds');
        });
    });
});

//LOGIN
router.get('/login',function(req,res){
    res.render('login');
});

router.post('/login',passport.authenticate('local',{
    successRedirect:'/campgrounds',
    failureRedirect:'/login'
    }),function(req,res){
    });
    
//LOGOUT
router.get('/logout',function(req,res){
    req.logout();
    res.redirect('/campgrounds');
});


module.exports=router;