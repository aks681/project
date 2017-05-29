var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('mongoose-validator');
var titlize = require('mongoose-title-case');

var postsSchema = new Schema({
  postname: {type: String, required: true},
  limit: {type: Number, required: true},
  qualification: {type: String},
  experience: {type: String},
  description: {type: String},
  pending: {type: [[{
                     username: String,
                     name: String,
                     doc: Schema.Types.ObjectId
                   }]]},
  approved: {type: [[{
                     username: String,
                     name: String,
                     doc: Schema.Types.ObjectId
                  }]]}
});

postsSchema.plugin(titlize,{
  paths: ['postname']
});

 module.exports = mongoose.model('Post',postsSchema);
