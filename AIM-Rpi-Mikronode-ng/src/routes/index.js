var randomstring = require('randomstring');
var express = require('express');
var mknodecmd = require('../../mknodecmd');
var indxrouter = express.Router();
var gvar = require('../models/gvar').gvar
/*
(function() {
  var rpiIP = "rpiIP0";
  var wlcIP = "wlcIP0";
  var rpiMEM = "rpiMEM0";
  var wlcMEM = "wlcMEM0";
  var rpiCPU = "rpiCPU0";
  var wlcCPU = "wlcCPU0";
  var lastREC = "lastREC";
  var income = 0;
  var uptime = "lastBoot";
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
  function setuptime(val) {
    uptime = val;
  };
  function getuptime() {
    return uptime;
  };
  function setIncome(val) {
    income = val;
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
    uptime: {
      set:function(val) {
        setuptime(val);
      },
      get:function(){
        return getuptime();
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
*/
// Get Homepage
indxrouter.get('/',function(req,res){
  res.render('index',{dashact:'active',settact:'',helpers: {
		getrpiIP: function () { return gvar.rpiIP.get()},
		getwlcIP: function () { return gvar.wlcIP.get()},
		getrpiCPU: function () { return gvar.rpiCPU.get()},
		getwlcCPU: function () { return gvar.wlcCPU.get()},
		getrpiMEM: function () { return gvar.rpiMEM.get()},
		getwlcMEM: function () { return gvar.wlcMEM.get()},
		getuptime: function () { return gvar.uptime.get()},
		getlastREC: function () { return gvar.lastREC.get()},
		getincome: function () { return gvar.income.get()},
		getvouchers: function () {return gvar.vouchers.get()},
    setuptime: function (value) { return gvar.uptime.set(value)},
    setincome: function (value) { return gvar.income.set(value)},
    setwlcCPU: function (value) { return gvar.wlcCPU.set(value)},
    setwlcMEM: function (value) { return gvar.wlcMEM.set(value)},
	}
  });
});
indxrouter.get('/settings',function(req,res,next){
  res.render('settings',{dashact:'',settact:'active',
	  getvouchers: function () {return gvar.vouchers.get()}});
});

indxrouter.post('/upload',function(req,res,next){
	console.log('...  ',req.body.comment);
	var arrlines = req.body.comment.split('\r\n');
	for(var i = 0;i < arrlines.length;i++){
		var tmp =arrlines[i].replace(/,/g,'');
		tmp=tmp.replace('add name=','');
		tmp=tmp.replace('limit-uptime=','');
		tmp=tmp.replace('limit-bytes-total=','');
		tmp=tmp.replace('kbps','000');
		arrlines[i] = tmp;
	}
	console.log('+++  ',arrlines);
	var vobjs = [];

	for(var i = 0;i < arrlines.length;i++){
		if (arrlines[i].length>12){
			var strsplit = arrlines[i].split(" ");
			if(strsplit.length>3){
				console.log('strsplit.length  : '+strsplit.length);
				console.log('strsplit ',strsplit);
				mknodecmd.GenUser(['=name=' + strsplit[0],'=limit-uptime='+strsplit[1]+' '+strsplit[2],'=limit-bytes-total='+strsplit[3]]);
				vobjs.push({
					name:strsplit[0],
					uptimelim:strsplit[1]+' '+strsplit[2],
					byteslim:strsplit[3]
				});
			}else{
				console.log('strsplit.length  : '+strsplit.length);
				mknodecmd.GenUser(['=name=' + strsplit[0],'=limit-uptime='+strsplit[1],'=limit-bytes-total='+strsplit[2]]);
				vobjs.push({
					name:strsplit[0],
					uptimelim:strsplit[1],
					byteslim:strsplit[2]
				});
			}
		}
	}
	/*
	var strRandom = randomstring.generate(4);
	var uptimelim = '03:00:00';
	var byteslim = '2M';
	var paramdata = ['=name=' + strRandom,'=limit-uptime='+uptimelim,'=limit-bytes-total='+byteslim];
	mknodecmd.GenUser(paramdata);
	*/
	gvar.vouchers.set([]);
	req.flash('success_msg','Successfuly Uploaded');
	console.log('var.vouchers.get',gvar.vouchers.get());
	res.redirect('/settings');
});

indxrouter.post('/settings',function(req,res,next){
	console.log('...  ',req.body);
	var ctr = req.body.numvoucher || 1;
	var upttmp = req.body.TDD + 'd ' + req.body.THH + ':' + req.body.TMM + ':' + req.body.TSS;

	var vtype = req.body.inlineRadioOptions
	for(i=1; i<=ctr;i++){

		var vtmp= "";
		switch (vtype){
			case 'lc':
				vtmp = randomstring.generate(4).toLowerCase();
				break;
			case 'uc':
				vtmp = randomstring.generate(4).toUpperCase();
				break;
			default:
				vtmp = randomstring.generate(4);
		}
		gvar.vouchers.push("add name="+vtmp+" limit-uptime="+upttmp+" limit-bytes-total="+req.body.trafficLim+"\n");
	}
	console.log('vouchers ', gvar.vouchers.get());

  //res.render('settings',{dashact:'',settact:'active'});
  req.flash('success_msg','You are register and can now login');
  res.redirect('/settings');
});

module.exports = {routes:indxrouter,gvar:gvar}
