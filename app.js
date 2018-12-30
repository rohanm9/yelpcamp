require('dotenv').config();
var express   =require('express'),
    app       =express(),
    bodyParser=require('body-parser'),
    mongoose  =require('mongoose'),
    Campground=require('./models/camp'),
    User      =require('./models/user'),
    passport  =require('passport'),
    commentRoutes=require('./routes/comments'),
    campgroundRoutes=require('./routes/campgrounds'),
    LocalStrategy=require('passport-local'),
    authRoutes=require('./routes/auth'),
    flash=require('connect-flash');

    /*seedDB    =require('./seed');*/

var Comment=require('./models/comment');
mongoose.connect('mongodb://rohan:qwerty123@ds145474.mlab.com:45474/yelpcampbyrohan',{useNewUrlParser:true});
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.use(require('express-session')({
    secret: 'rohan',
    resave: 'false',
    saveUninitialized: 'false'
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
/*seedDB();*/
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//middleware applied to each and every route
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash('error');
    res.locals.success=req.flash('success');
    next();
});
app.use('/campgrounds',campgroundRoutes);
app.use('/campgrounds/:id/comments',commentRoutes);
app.use('/',authRoutes);
app.listen(process.env.PORT||8080,function(req,res){
    console.log('server has started!!');
});
