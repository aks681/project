var User=require('../models/user');
var Post=require('../models/posts');
var jwt=require('jsonwebtoken');
var secret = 'awesome';
//router= export all accessing done to server
module.exports = function(router){
  router.post('/post',function(req,res){
    var post=new Post();
    post.postname=req.body.postname;
    post.limit=req.body.limit;
    post.qualification=req.body.qualification;
    post.experience=req.body.experience;
    post.description=req.body.description;
    post.save(function(err){
      if(err) console.log(err);
      else {
        res.json({success: true, message: 'Post added'});
      }
    });
  });

  router.get('/posts',function(req,res){
    Post.find({},function(err,posts){
      if(err)
       throw err;
       if(!posts)
       {
         res.json({success: false, message: "No available posts"});
       }
     res.json({success: true, posts: posts});
    });
  });

  router.put('/apply',function(req,res){
    var username = req.body.username;
    var name=req.body.name;
    var id=req.body.id;
    var error = false;
    Post.findOne({_id: id},function(err,post){
      if(err) throw err;
      if(!post)
       {
         res.json({success: false, message: 'Invalid post'});
       }
       else {
         if(post.limit == 0)
         {
           res.json({success: false, message: 'No more available vacancies'});
         }
         else {
           for(var i = 0; i < post.pending.length; i++)
           {
             if(post.pending[i][0].username === username)
             {
               error=true;
             }
           }
           for(var i = 0; i < post.approved.length; i++)
           {
             if(post.approved[i][0].username === username)
             {
               error=true;
             }
           }
           if(error)
           {
             res.json({success: false, message: 'You have already applied for this post'});
           }
           else {
             User.findOne({username: username},function(err,user){
               if(err) throw err;
               if(!user){
                 res.json({success: false, message: "No user found"});
               }
               else {
                 user.pending.push(id);
                 user.save(function(err){
                   if(err) throw err;
                 });
                 Post.update({"_id": id},{"$push": {"pending": user}},function(err){
                   if(err) console.log("Heey3");
                   else {
                     res.json({success: true, message: "Applied for post, waiting for approval"});
                   }
                 });
               }
             });
           }
       }
       }
    });

  });


 router.post('/users',function(req,res){
  var user = new User();
  user.username = req.body.username;
  user.password = req.body.password;
  user.email = req.body.email;
  user.name = req.body.name;
  user.role=req.body.role;
  if(user.role)
  {
    user.permission = 'admin';
  }
  else {
    user.permission = 'user';
  }
  if(req.body.username==null||req.body.username==''){
    res.json({success: false,message:"Username field is empty"});
  }
else if(req.body.password==null||req.body.password==''){
  res.json({success: false,message:"Password field is empty"});
}
else if(req.body.name==null||req.body.name==''){
  res.json({success: false,message:"Name field is empty"});
}
else if(req.body.email==null||req.body.email==''){
  res.json({success: false,message:"Email field is empty"});
}
  else{
  user.save(function(err){
    if(err){
    if(err.code === 11000){
    res.json({success: false,message:"Username or email already exists"});
     }
     else if(err.errors.email){
       res.json({success: false, message: err.errors.email.message});
     }
     else if(err.errors.name){
       res.json({success: false, message: err.errors.name.message});
     }
     else if(err.errors.username){
       res.json({success: false, message: err.errors.username.message});
     }
     else if(err.errors.password){
       res.json({success: false, message: err.errors.password.message});
     }
  }
    else {
      res.json({success: true,message:"You Are Now Registered"});
    }
  });
}
});
//User LOgin
router.post('/authenticate',function(req,res){
  User.findOne({username: req.body.username}).select('email username password role').exec(function(err,user){
    if(err)
     throw err;
     if(!user){
       res.json({success: false, message: "Could Not Authenticate User"});
     } else if(user)
     {
       if(req.body.password){
       var validPassword = user.comparePassword(req.body.password);
       if(!validPassword){
         res.json({success: false, message :"Password Incorrect"});
       }
       else{
         var token = jwt.sign({username: user.username, email: user.email},secret,{expiresIn:'24h'});
         res.json({success: true, message: "Successfully Logged In", token: token, role: user.role});
       }
     }
     else {
       res.json({success: false, message :"No Password provided"});
     }
     }
  });
});
//express middleware
router.use(function(req,res,next){
  var token=req.body.token||req.body.query||req.headers['x-access-token'];
  if(token)
  {
    jwt.verify(token,secret,function(err,decoded){
      if(err)
      {
        res.json({success: false, message: "User Session Expired Invalid token"});
      }
      else {
        req.decoded= decoded;
        next();
      }
    });
  }
  else{
    res.json({success: false, message: "No User Available"});
  }
});
router.post('/current',function(req,res){
  res.send(req.decoded);
});

router.get('/permission',function(req,res){
  User.findOne({username: req.decoded.username}, function(err, user){
    if(err)
     throw err;
     if(!user){
       res.json({success: false, message: 'No User found'});
     }
     else{
       res.json({success: true, permission: user.permission});
     }
  });
});

router.get('/management',function(req,res){
  User.find({},function(err,users){
    if(err)
     throw err;

   User.findOne({username: req.decoded.username}, function(err,primuser){
     if(err) throw err;
     if(!primuser){
       res.json({success: false, message: 'No user found'});
     }
     else{
       if(primuser.permission==='admin')
       {
        if(!users){
          res.json({success: false, message: 'No users'});
        }
        else{
          res.json({success: true, users: users, permission: primuser.permission});
        }
       }
       else {
         res.json({success: false, message: "Unauthorized"});
       }
     }
   });
  });
});

router.delete('/management/:id',function(req,res){
  var deletepost=req.params.id;
  User.findOne({username:req.decoded.username},function(err,mainuser){
    if(err) throw err;
    if(!mainuser){
      res.json({success: false, message: 'No user found'});
    }
    else {
      if(mainuser.permission==='admin')
      {
        if(!deletepost){
          res.json({success: false, message: 'No post to delete'});        }
        else {
          Post.findOneAndRemove({_id: deletepost},function(err,post){
            if(err) throw err;
            res.json({success: true, message: "Post deleted"});
          });
        }
      }
      else {
        res.json({success: false, message: "Unauthorized"});      }
    }
  });
});

router.get('/edit/:id',function(req,res){
  var editPost=req.params.id;
  User.findOne({username: req.decoded.username},function(err,mainuser){
    if(err) throw err;
    if(!mainuser){
      res.json({success: false, message: 'No user found'});
    }
    else {
      if(mainuser.permission==='admin'){
        Post.findOne({_id: editPost},function(err,post){
          if(err) throw err;
          if(!post){
            res.json({success: false, message: 'No post to edit'});
          }
          else {
            res.json({success: true, message: 'Post found', post: post});
          }
        });
      }
      else {
        res.json({success: false, message: "Unauthorized"});      }
    }
  });
});

router.get('/getpost/:id',function(req,res){
  var getpost=req.params.id;
  Post.findOne({_id: getpost},function(err,post){
    if(err) throw err;
    if(!post){
      res.json({success: false, message: 'The post does not exist'});
    }
    else {
      res.json({success: true, message: 'Post found', post: post});
    }
  });
});

router.put('/edit',function(req,res){
  var editPost=req.body._id;
  if(req.body.name)
   var newName=req.body.name;
   if(req.body.limit)
    var newLimit=req.body.limit;
    if(req.body.qualification)
     var newQualification=req.body.qualification;
     if(req.body.experience)
      var newExperience=req.body.experience;
      if(req.body.description)
       var newDescription=req.body.description;
  User.findOne({username: req.decoded.username},function(err,mainuser){
    if(err) throw err;
    if(!mainuser){
      res.json({success: false, message: 'No user found'});
    }
    else {
      if(mainuser.permission==='admin'){
         if(newName){
           Post.findOne({_id: editPost},function(err,post){
             if(err) throw err;
             if(!post){
               res.json({success: false,message: "No post found"});
             }
             else {
               post.postname=newName;
               post.save(function(err){
                 if(err) {
                   res.json({success: false, message: err.errors.postname.message});
                 }
                 else {
                   res.json({success: true, message: "Name has been changed"});
                 }
               });
             }
           });
         }
         if(newLimit){
           Post.findOne({_id: editPost},function(err,post){
             if(err) throw err;
             if(!post){
               res.json({success: false,message: "No post found"});
             }
             else {
               post.limit=newLimit;
               //console.log(post);
               post.save(function(err){
                 if(err) {
                   res.json({success: false, message: err.errors.limit.message});
                 }
                 else {
                   res.json({success: true, message: "Limit number has been changed"});
                 }
               });
             }
           });
         }
         if(newQualification){
           Post.findOne({_id: editPost},function(err,post){
             if(err) throw err;
             if(!post){
               res.json({success: false,message: "No post found"});
             }
             else {
               post.qualification=newQualification;
               post.save(function(err){
                 if(err) {
                   res.json({success: false, message: err.errors.qualification.message});
                 }
                 else {
                   res.json({success: true, message: "Qualification has been changed"});
                 }
               });
             }
           });
         }
         if(newExperience){
           Post.findOne({_id: editPost},function(err,post){
             if(err) throw err;
             if(!post){
               res.json({success: false,message: "No post found"});
             }
             else {
               post.experience=newExperience;
               post.save(function(err){
                 if(err) {
                   res.json({success: false, message: err.errors.experience.message});
                 }
                 else {
                   res.json({success: true, message: "Experience has been changed"});
                 }
               });
             }
           });
         }
         if(newDescription){
           Post.findOne({_id: editPost},function(err,post){
             if(err) throw err;
             if(!post){
               res.json({success: false,message: "No post found"});
             }
             else {
               post.description=newDescription;
               post.save(function(err){
                 if(err) {
                   res.json({success: false, message: err.errors.description.message});
                 }
                 else {
                   res.json({success: true, message: "Description has been changed"});
                 }
               });
             }
           });
         }
      }
      else {
        res.json({success: false, message: "Unauthorized"});
      }
    }
  });
});

router.get('/pending',function(req,res){
  User.findOne({username: req.decoded.username},function(err,user){
    if(err) throw err;
    if(!user){
      res.json({success: false, message: "User not found"});
    }
    else {
      res.json({success: true, pending: user.pending});
    }
  });
});

router.get('/approved',function(req,res){
  User.findOne({username: req.decoded.username},function(err,user){
    if(err) throw err;
    if(!user){
      res.json({success: false, message: "User not found"});
    }
    else {
      if(user.approved){
      res.json({success: true, approved: user.approved});
    }
    else {
      res.json({success: false, message: "No posts in this list"});
    }
    }
  });
});
router.get('/rejected',function(req,res){
  User.findOne({username: req.decoded.username},function(err,user){
    if(err) throw err;
    if(!user){
      res.json({success: false, message: "User not found"});
    }
    else {
      if(user.rejected){
      res.json({success: true, rejected: user.rejected});
    }
    else {
      res.json({success: false, message: "No posts in this list"});
    }
    }
  });
});

router.put('/addreject',function(req,res){
  var username=req.body.username;
  var id=req.body.id;
  User.findOne({username: username},function(err,user){
    if(err) throw err;
    if(!user){
      res.json({success: false, message: "User does not exist any more"});
    }
    else {
      user.rejected.push(id);
      for(var i=0;i<user.pending.length;i++)
      {
        if(user.pending[i]==id)
        {
          user.pending.splice(i,1);
          break;
        }
      }
      user.save(function(err){
        if(err) {
          throw err;
          res.json({success: false, message: "User could not be rejected"});
        }
        else {
          res.json({success: true, message: "User rejected"});
        }
      });
    }
  });
});

router.put('/addapprove',function(req,res){
  var username=req.body.username;
  var id=req.body.id;
  User.findOne({username: username},function(err,user){
    if(err) throw err;
    if(!user){
      res.json({success: false, message: "User does not exist any more"});
    }
    else {
      user.approved.push(id);
      for(var i=0;i<user.pending.length;i++)
      {
        if(user.pending[i]==id)
        {
          user.pending.splice(i,1);
          break;
        }
      }
      user.save(function(err){
        if(err) {
          throw err;
          res.json({success: false, message: "User could not be approved"});
        }
        else {
          res.json({success: true, message: "User approved"});
        }
      });
    }
  });
});

router.delete('/rejectuser',function(req,res){
  var username=req.query.username;
  var id=req.query.id;
  Post.findOne({_id:id},function(err,post){
    if(err) throw err;
    if(!post){
      res.json({success: false, message: "Post does not exist"});
    }
    else {
      for(var i=0;i<post.pending.length;i++)
      {
        if(post.pending[i][0].username===username)
        {
          post.pending.splice(i,1);
          post.save(function(err){
            if(err) {
              res.json({success: false, message: "Could not reject"});
            }
            else {
              res.json({success: true, message: "User rejected"});
            }
          });
          break;
        }
      }
    }
  });
});

router.delete('/removereject',function(req,res){
  var username=req.query.username;
  var id=req.query.id;
  User.findOne({username:username},function(err,user){
    if(err) throw err;
    if(!user){
      res.json({success: false, message: "User does not exist"});
    }
    else {
      for(var i=0;i<user.rejected.length;i++)
      {
        if(user.rejected[i]==id)
        {
          user.rejected.splice(i,1);
          user.save(function(err){
            if(err) {
              res.json({success: false, message: "Could not reject"});
            }
            else {
              res.json({success: true, message: "User removed from rejected list"});
            }
          });
          break;
        }
      }
    }
  });
});

router.put('/approveuser',function(req,res){
  var user={},limit;
  user.username=req.body.username;
  user.name=req.body.name;
  var id=req.body.id;
  Post.findOne({_id:id},function(err,post){
    if(err) throw err;
    if(!post){
      res.json({success: false, message: "Post does not exist"});
    }
    else {
       post.limit=post.limit-1;
       post.save(function(err){
         if (err) throw err;
       });
    }
  });
  Post.update({"_id": id},{"$push": {"approved": user}},function(err){
    if(err) throw err;
    else {
      res.json({success: true, message: "User Approved"});
    }
  });
});
  return router;
};
