var express = require('express');
var router = express.Router();
var usermodel = require('../models/user');
//var httpobj = require('http');
var requestobj = require('request');
// Register
router.get('/register',function(req,res){
  res.render('register');
});

// login route
router.get('/login',function(req,res){
  res.render('login');
});

router.post('/login',function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  console.log("login username: " + username);
  console.log("login password: " + password);

  requestobj({url: 'http://192.168.1.1:3000/users/' + username, json: true}, function(err, res, json) {
    if (err) {
       throw err();
    }
    console.log(json);
  });
  res.render('login');
});
// Register User
router.post('/register',function(req,res){
   var name = req.body.name;
   var email = req.body.email;
   var username = req.body.username;
   var password = req.body.password;
   var password2 = req.body.password2;

   // Validation
   req.checkBody('name','Name is required').notEmpty();
   req.checkBody('email','Email is required').notEmpty();
   req.checkBody('email','Email is not valid').isEmail();
   req.checkBody('username','Username is required').notEmpty();
   req.checkBody('password','Password is required').notEmpty();
   req.checkBody('password2','Password do not match').equals(req.body.password);

   csonsole.log("++++++++++++++++++test+++++++++++: " );
   var errorsobj = req.validationErrors();
   if (errorsobj){



    var options = {
      url: 'http://192.168.1.1:3000/login',
      method: 'POST',
      headers: {"content-type": "application/json"},
      json:true,
      form: {
        "username": username,
        "password" :password
      }
    };
    requestobj(options, function (error, response, body) {
      console.log("xvsdaf : " + username);
      if (!error && response.statusCode == 200) {
        console.log(body.id) // Print the shortened url.
      }
    });
    console.log("done : " + username);

     res.render('register',{
       errors:errorsobj
     });



   }
   else {
     console.log("NNNNNN");
  //   console.log("http json:" + httpobj.get('http://192.168.1.1:3000/api/serviceapi'));

     /*
     var newUser = new usermodel({
       name: name,
       email: email,
       username: username,
       password: password
     });
     usermodel.createUser(newUser,function(err,userobjcallback){
       if (err) throw err;
       console.log(userobjcallback)
     });
     req.flash('success_msg','You are register and can now login');
     res.redirect('/users/login');
     */
   }
   //function getcont()

});

module.exports = router;
