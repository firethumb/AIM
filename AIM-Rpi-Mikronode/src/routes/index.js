var express = require('express');
var indxrouter = express.Router();

// Get Homepage
indxrouter.get('/',function(req,res){
  res.render('index');
});
module.exports = indxrouter;
