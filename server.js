var express=require('express');
var bodyParser=require('body-parser');
var morgan=require('morgan');
var mongoose=require('mongoose');
var app=express();
var router =express.Router();
var appRoutes=require('./app/routes/api')(router);
var port = process.env.PORT || 8080;
var path=require('path');
var multer=require('multer');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public')); //allow front end folder 'public' access to all the back end stuff
app.use('/api',appRoutes); //not conflict with angular routes

var storage = multer.diskStorage({
  destination: function(req,file, cb){
    cb(null,'./app/routes/uploads/');   //storing images temporarily
  },
  filename: function(req,file, cb){
    if(!file.originalname.match(/\.(pdf)$/)){
      var err = new Error();
      err.code='filetype';
      return cb(err);
    } else {
      cb(null, Date.now() + '_' + file.originalname);
    }
  }
});
var upload = multer({
    storage: storage,
    limits: {fileSize: 10000000}
    }).single('image');   //image is the name given to the formdata

app.post('/upload',function(req,res){
      var username=req.body.username;
       upload(req,res,function(err){
         if(err){
           if(err.code === 'LIMIT_FILE_SIZE'){
             res.json({success: false, message: "File limit exceeded (max: 10MB)"});
           }
           else if(err.code === 'filetype'){
             res.json({success: false, message: "Only pdf files are supported"});
           }else {
             console.log(err);
             res.json({success: false, message: "Unable to upload"});
           }
         }
         else {
           if(req.file){
             res.json({success: true, message: "File uploaded",path: req.file.path,name: req.file.originalname});
           }else {
             res.json({success: false, message: "No file received"});
           }
         }
       });
    });

app.get('*',function(req,res){
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(port,function(){
  console.log("Server running on port 8080");
});
