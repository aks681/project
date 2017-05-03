var User=require('../models/user');
//router= export all accessing done to server
module.exports = function(router){
 router.post('/users',function(req,res){
  var user = new User();
  user.username = req.body.username;
  user.password = req.body.password;
  user.email = req.body.email;
  user.role=req.body.role;
  if(req.body.username==null||req.body.username==''){
    res.json({success: false,message:"Username field is empty"});
  }
else if(req.body.password==null||req.body.password==''){
  res.json({success: false,message:"Password field is empty"});
}
else if(req.body.email==null||req.body.email==''){
  res.json({success: false,message:"Email field is empty"});
}
  else{
  user.save(function(err){
    if(err){
    res.json({success: false,message:"Username or email already exists"});
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
         res.json({success: true, message: "Successfully Logged In"});
       }
     }
     else {
       res.json({success: false, message :"No Password provided"});
     }
     }
  });
});
  return router;
}
