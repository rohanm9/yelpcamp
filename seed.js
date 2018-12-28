var mongoose=require('mongoose');

var Campground=require('./models/camp');
var Comment=require('./models/comment');

var data=[  {name: 'Shimla', image : 'http://www.hailhimalayas.com/wp-content/uploads/2014/11/Slide-3.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
            {name: 'Mountain-Hills', image : 'https://d27k8xmh3cuzik.cloudfront.net/wp-content/uploads/2017/09/Cover8.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}];

function seedDB(){
    Campground.deleteMany({},function(err){
        if(err){
            console.log(err);
        }
            console.log('all campgrounds removed');
            data.forEach(function(seed){
                Campground.create(seed,function(err,campground){
                    if(err){
                        console.log(err);
                    }
                    else{
                        Comment.create({
                            author: 'Homer',
                            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'
                        },function(err,comment){
                            campground.comments.push(comment);
                            campground.save();
                            console.log('New comment with campground created');
                        });
                    }
                });
            });
    
    });
        
    
}



module.exports=seedDB;