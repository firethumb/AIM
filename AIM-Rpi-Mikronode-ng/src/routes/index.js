var express = require('express');
var indxrouter = express.Router();
var gvar = (function() {
  var rpiIP = "rpiIP0";
  var wlcIP = "wlcIP0";
  var rpiMEM = "rpiMEM0";
  var wlcMEM = "wlcMEM0";
  var rpiCPU = "rpiCPU0";
  var wlcCPU = "wlcCPU0";
  var lastREC = "lastREC";
  var income = "income adsa";
  var lastBoot = "lastBoot";
  var vouchers = [];

  function setrpiIP(val) {
    rpiIP = val;
  };
  function getrpiIP() {
    return rpiIP;
  };
  function setwlcIP(val) {
    wlcIP = val;
  };
  function getwlcIP() {
    return wlcIP;
  };
  function setrpiCPU(val) {
    rpiCPU = val;
  };
  function getrpiCPU() {
    return rpiCPU;
  };
  function setwlcCPU(val) {
    wlcCPU = val;
  };
  function getwlcCPU() {
    return wlcCPU;
  };
  function setrpiMEM(val) {
    rpiMEM = val;
  };
  function getrpiMEM() {
    return rpiMEM;
  };
  function setwlcMEM(val) {
    wlcMEM = val;
  };
  function getwlcMEM() {
    return wlcMEM;
  };
  function setlastBoot(val) {
    lastBoot = val;
  };
  function getlastBoot() {
    return lastBoot;
  };
  function setIncome(val) {
    lastlogin = val;
  };
  function getIncome() {
    return income;
  };
  function setlastREC(val) {
    lastlogin = val;
  };
  function getlastREC() {
    return lastREC;
  };
  function setvouchers(val) {
    vouchers = null;
    vouchers = val;
  };
  function getvouchers() {
    return vouchers;
  };
  function pushvouchers(val) {
    if (val){
      vouchers.push(val);
      return 0;
    }else { return -1; };
  }
  return {
    rpiIP: {
      set:function(val) {
        setrpiIP(val);
      },
      get:function(){
        return getrpiIP();
      }
    },
    wlcIP: {
      set:function(val) {
        setwlcIP(val);
      },
      get:function(){
        return getwlcIP();
      }
    },
    rpiMEM: {
      set:function(val) {
        setrpiMEM(val);
      },
      get:function(){
        return getrpiMEM();
      }
    },
    wlcMEM: {
      set:function(val) {
        setwlcMEM(val);
      },
      get:function(){
        return getwlcMEM();
      }
    },
    rpiCPU: {
      set:function(val) {
        setrpiCPU(val);
      },
      get:function(){
        return getrpiCPU();
      }
    },
    wlcCPU: {
      set:function(val) {
        setwlcCPU(val);
      },
      get:function(){
        return getwlcCPU();
      }
    },
    lastREC: {
      set:function(val) {
        setlastREC(val);
      },
      get:function(){
        return getlastREC();
      }
    },
    lastBoot: {
      set:function(val) {
        setlastBoot(val);
      },
      get:function(){
        return getlastBoot();
      }
    },
    income: {
      set:function(val) {
        setIncome(val);
      },
      get:function(){
        return getIncome();
      }
    },
    vouchers:{
      set:function(val) {
        setvouchers(val);
      },
      get:function(){
        return getvouchers();
      },
      push:function(val){
        return pushvouchers(val);
      }
    }
  };
})();

// Get Homepage
indxrouter.get('/',function(req,res){
  res.render('index',{dashact:'active',settact:'',helpers: {
                getrpiIP: function () { return gvar.rpiIP.get()},
                getwlcIP: function () { return gvar.wlcIP.get()},
                getrpiCPU: function () { return gvar.rpiCPU.get()},
                getwlcCPU: function () { return gvar.wlcCPU.get()},
                getrpiMEM: function () { return gvar.rpiMEM.get()},
                getwlcMEM: function () { return gvar.wlcMEM.get()},
                getlastBoot: function () { return gvar.lastBoot.get()},
                getlastREC: function () { return gvar.lastREC.get()},
                getincome: function () { return gvar.income.get()},
            }
  });
});
indxrouter.get('/settings',function(req,res,next){
  res.render('settings',{dashact:'',settact:'active'});
});

module.exports = {routes:indxrouter,gvar:gvar}
