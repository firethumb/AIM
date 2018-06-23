//var mongooseobj = require('mongoose');
var bcryptjsobj = require('bcryptjs');

/*
mongooseobj.connect('mongodb://192.168.1.18/loginapp');

var db = mongooseobj.connection;

var userSchema = mongooseobj.Schema({
  username:{
    type: String,
    index: true
  },
  password:{
    type: String
  },
  email:{
    type: String
  },
  name: {
    type: String
  }
});

var userobj = module.exports = mongooseobj.model('users',userSchema);
module.exports.createUser = function(newUser,callback){
  bcryptjsobj.genSalt(10, function(err, salt) {
     bcryptjsobj.hash(newUser.password, salt, function(err, hash) {
         newUser.password = hash
         newUser.save(callback)
     });
  });
}
*/
