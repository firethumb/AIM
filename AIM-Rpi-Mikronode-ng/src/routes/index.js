var randomstring = require('randomstring');
var express = require('express');
var mknodecmd = require('../../mknodecmd');
var indxrouter = express.Router();
var gvar = require('../models/gvar').gvar
var guivar = require('../models/gvar').guivar
var themebodydef = 'index';
var themesettings = 'settings';
// Get Homepage
indxrouter.get('/',function(req,res){
  if (guivar.skin.get()==2){
      themebodydef =  'i2';
  }else {
      themebodydef =  'index';
  }
  console.log('themebodydef ',themebodydef);
  res.render(themebodydef,{dashact:'active',settact:'',helpers: {
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
  if (guivar.skin.get()==2){
      themesettings = 's2';
  }else {
      themesettings = 'settings';
  }
  res.render(themesettings,{dashact:'',settact:'active',
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
