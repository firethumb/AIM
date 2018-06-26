var express = require('express');
var indxrouter = express.Router();

var gvalcssprop = (function() {
  var classlco = "btn btn-primary";
  var classuco = "btn btn-default";
  var classmao = "btn btn-default";
  function setClasslco(val) {
    classlco = val;
  }
  function setClassuco(val) {
    classuco = val;
  }
  function setClassmao(val) {
    classmao = val;
  }
  function getClasslco() {
    return classlco;
  }
  function getClassuco() {
    return classuco
  }
  function getClassmao(val) {
    return classmao
  }
  return {
    setLCO: function(val) {
      console.log("hhh asfasdfads" + val);
      setClasslco(val);
    },
    setUCO: function(val) {
      setClassuco(val);
    },
    setMAO: function(val) {
      setClassmao(val);
    },
    getLCO: function(val) {
      return getClasslco();
    },
    getUCO: function(val) {
      return getClassuco();
    },
    setMAO: function(val) {
      return getClassmao();
    }
  };
})();

// Get Homepage
indxrouter.get('/',function(req,res){
  res.render('index',{dashact:'active',settact:''});
});
indxrouter.get('/settings',function(req,res,next){
  res.render('settings',{dashact:'',settact:'active',helpers: {
                setlco: function () { gvalcssprop.setLCO('btn btn-primary'); gvalcssprop.setUCO('btn btn-default'); gvalcssprop.setMAO('btn btn-default'); },
                setuco: function () { gvalcssprop.setLCO('btn btn-default'); gvalcssprop.setUCO('btn btn-primary'); gvalcssprop.setMAO('btn btn-default'); },
                setmao: function () { gvalcssprop.setLCO('btn btn-default'); setUCO('btn btn-default'); setMAO('btn btn-primary'); },
                getlco: function () { return gvalcssprop.getLCO();},
                getuco: function () { return gvalcssprop.getUCO();},
                getmao: function () { return gvalcssprop.getMAO();}
            }
  });
});

module.exports = indxrouter;
