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
    authRoutes=require('./routes/auth');

    /*seedDB    =require('./seed');*/

var Comment=require('./models/comment');
mongoose.connect('mongodb://localhost:27017/yelp_camp',{useNewUrlParser:true});
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.use(require('express-session')({
    secret: 'rohan',
    resave: 'false',
    saveUninitialized: 'false'
}));

app.use(passport.initialize());
app.use(passport.session());
/*seedDB();*/
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
});
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}
app.use('/campgrounds',campgroundRoutes);
app.use('/campgrounds/:id/comments',commentRoutes);
app.use('/',authRoutes);
app.listen(3000,function(req,res){
    console.log('server has started!!');
});
