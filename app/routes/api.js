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
    res.send("Username field is empty");
  }
else if(req.body.password==null||req.body.password==''){
  res.send("Password field is empty");
}
else if(req.body.email==null||req.body.email==''){
  res.send("Email field is empty");
}
else if(req.body.role==null||req.body.role==''){
  res.send("You have not specified a role");
}
  else{
  user.save(function(err){
    if(err){
    res.send('username or email already exists');
  }
    else {
      res.send('User Created!')
    }
  });
}
});
  return router;
}
