appendlogs('program starting...\n');

load_initconfig('key');
return null;
var ntpClient = require('ntp-client');
var max7219lib = require('node-max7219-led-matrix');
var max7219 = new max7219lib.max7219("/dev/spidev0.0");
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require ('express-handlebars');
var expressValidator =  require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var randomstring = require('randomstring');
var os = require('os');
var randomstring = require('randomstring');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var ispactvflg = false;
var ntpIP = "131.101.1.199";
var okbtn = false;
const pisoval = 12;
var daythreshold = 20;
var coinInputDly = 4000;
var coinAcceptDly = 8000;
var okBtnDly = 500;
var flgblinkdisp1 = false;
var disp1Tflg = false;
var HTTP_PORT = 8080;
//const raspi = require('raspi');
//const Serial = require('raspi-serial').Serial;
var Gpio = require('onoff').Gpio
var coin_waitflg = false;
var cvaldly = false;
var cval = 0;
var gvar = require('./src/routes/index');
const VoucherNum = 4;
var mknodecmd = require('./mknodecmd');
var hwhbactiveflg = false;
var timeoutHndler = [];
var cointHndler = [];
get_sysID("Serial",true,function(cbval){
	appendlogs(cbval + '\n');
	console.log('val :' +cbval);
});

sysinitfn();
gethwheartbeats(20000);
getcoinINT();
expressSRV();
appendlogs('Application Ready');
//!------------------------------------------------------
function sysinitfn(){
	appendlogs('initializing..');
	coinInputDly = 4000;
	coinAcceptDly = 8000;
	okBtnDly = 500;
	flgblinkdisp1 = false;
	disp1Tflg = false;
	HTTP_PORT = 8080;
	max7219.setBrightness(6);
	max7219.setBrightness(6);
	max7219.setBrightness(6);
	max7219.clear();
	setDispLEDS('init',true);
	coin_waitflg = false;
	cvaldly = false;
	cval = 0;
	hwhbactiveflg = false;
	timeoutHndler = [];
	cointHndler = [];
	gvar.gvar.income.set(0);
	ispactvflg = false;
	gvar.gvar.rpiIP.set(getrpiIPADDR(os.networkInterfaces()));
	ntpIP = "131.101.1.199";
	appendlogs('Set NTP IP: ' + ntpIP);
	appendlogs('Set coinAcceptDly: ' + coinAcceptDly);
	appendlogs('Set income counter to 0.');
	max7219.cls();
}
function adminconfigParser(ARR,KEYS,OPTION){		//need Arry element set toUpperCase
	var tmparry = ARR;
	var result;
	if (OPTION==='json'){
		result='{';
	}else {
		result=[];
	}
		var flg = false;
		console.log('tmparry',tmparry);
		console.log('KEYS',KEYS	);
		for(var i=0;i<KEYS.length;i++){
			var j=0;
			flg = false;
			for (;j<tmparry.length;j++){
				if(tmparry[j].indexOf(KEYS[i])!==-1){
					var tmp = tmparry[j].split('=');
					if (OPTION==='json'){
						if ((j+1)==tmparry.length){
							result = result + '"' + tmp[0] + '":' + '"' + tmp[1] + '"}';
							return JSON.parse(result);
						}else {
							result = result + '"' + tmp[0] + '":' + '"' + tmp[1] + '",';
						}
					}else{
						if(tmp[1]!==undefined){
							result.push(tmp[1]);
						}else{
							result.push(-1);
						}
						flg = true;
						break;
					}
				}
			}
			if(flg){
				tmparry.splice(j,1);
			}
		}
	return result;
}
function genericArryParser(ARR,KEYS,option){
	var tmparry = KEYS;
	var result=[];
	var flg = false;
	var tmp2 =  ARR[0];
	if (option!=='section'){
		for(var i=0;i<tmp2.length;i++){
			var j =0;
			flg = false;
			for (;j<tmparry.length;j++){
				if(tmp2[i].indexOf(tmparry[j])!==-1){
					var tmp = tmp2[i].split('='+tmparry[j]+'=');
					if (option){
						result.push( tmparry[j]+':'+tmp[1]);
					}else{
						result.push(tmp[1]);
					}
					flg = true;
					break;
				}
			}
			if(flg){
				tmparry.splice(j,1);
			}
		}
	}else{
		var stopflg = false;
		for(var i=0;i<tmp2.length;i++){
			if(tmp2[i].indexOf('!re')!==-1){
				result=[];
				if (stopflg){
					break;
				}
			}else{
				result.push(tmp2[i]);
				if(tmp2[i].indexOf(KEYS)!==-1){
					stopflg = true;
				}
			}
		}
	}
	console.log('====== genericArryParser  ',result);
	return result;
}
function setDispLEDS(valueobj,clsflg){
	var vararry=[];
	if(typeof valueobj=== 'string'){
		for(var i=0;i<valueobj.length;i++){
			vararry.push(valueobj.charAt(i));
		}
	}else if(Object.prototype.toString.call(valueobj) === '[object Array]') {
		vararry = valueobj;
	}else{ return false};
	try{
		if(clsflg){
			max7219.cls();
		}
		max7219.letterx(vararry[0],1);
		max7219.letterx(vararry[1],2);
		max7219.letterx(vararry[2],3);
		max7219.letterx(vararry[3],4);
	}catch(e){
		return false;
	}
	return true;
}

function addvoucher(coinval){
	var strRandom = randomstring.generate(VoucherNum);
	var uptlim = "";
	var i=0;
	for (;((coinval>=daythreshold)&&(i<5));i++){
		coinval = coinval - daythreshold;
	}
	if(i>0){
		uptlim = i+'d ';
	}
	uptlim = uptlim + pisoconversionfn(coinval);
//	console.log('kkkkkk    ' + strRandom + "  Lim  " + uptlim);
	if(okbtn){
		setDispLEDS(strRandom,true);
	}
	mknodecmd.GenUser(['=name=' + strRandom,'=limit-uptime='+uptlim]);
	appendlogs('Amount: '+ coinval + '  added voucher: ' + strRandom + '  lim: ' +  uptlim);
}
function pisoconversionfn(value){
	if (value<=0){return '00:00:00';}
	var tmpv = pisoval * value;
	var i = 0;
	for (;tmpv>=60;i++){
		tmpv = tmpv - 60;
	}
	if (tmpv>=10){
		return '0'+i+':'+tmpv+':00';
	}
	return '0'+i+':0'+tmpv+':00';
}
function getcoinINT(){
	console.log('Ready to accept coin...');
	appendlogs('Ready to accept coin..');
	button = new Gpio(17, 'in', 'both');
	button.watch(function (err, value) {
		if (err) throw err;
		//console.log('GPIO17 value: ' + value);
		if(value == 1){
			cval++;
			setDispLEDS('#'+cval,true);
			okbtn = false;
		}
		if(cvaldly){
			console.log('+++**** true');
			clearTimeout(timeoutHndler);
			timeoutHndler = setTimeout(cvaldlyfn,coinInputDly);
			clearTimeout(cointHndler);
		}
		else{
			console.log('+++**** false');
			cvaldly = true;
			timeoutHndler = setTimeout(cvaldlyfn,coinInputDly);
		}
	});
}
function getokbtnINT(){
	console.log('OK Button Activated!');
	appendlogs('OK Button Activated');
	okbtnobj = new Gpio(4, 'in', 'both');
	okbtnobj.watch(function (err, value) {
		if (err) throw err;
		//console.log('GPIO17 value: ' + value);
		if(value == 1){
			setTimeout(function(){
				okbtn = true;
				clearTimeout(timeoutHndler);
				clearTimeout(cointHndler);
				cointHndler = setTimeout(coinwdlyfn,okBtnDly);
			},300);
		}
	});
}
function cvaldlyfn(){
	console.log('Coin Accepted:  ' + cval);
	if(cval>99){
		setDispLEDS('>'+cval,true);
	}else if(cval>9){
		setDispLEDS('> '+cval,true);
	}else{
		setDispLEDS('>> '+cval,true);
	}
	cvaldly = false;
	if (coin_waitflg){
		clearTimeout(cointHndler);
		cointHndler = setTimeout(coinwdlyfn,coinAcceptDly);
	}else{
		coin_waitflg = true;
		cointHndler = setTimeout(coinwdlyfn,coinAcceptDly);
	}
}
function coinwdlyfn(){
	console.log(cval + 'php  creating voucher..');
	setDispLEDS('^'+cval,true);
	coin_waitflg = false;
	okbtn = true;
	var amt = gvar.gvar.income.get() + cval;
	gvar.gvar.income.set(amt);
	io.emit('updates',{income:amt});
	addvoucher(cval);
	cval = 0;
}
function check_HW_STAT(){
	var cpus = os.cpus();
	var cpustat = "CPU's: ";
	var memt = os.totalmem();
	var memf = os.freemem();
	gvar.gvar.rpiMEM.set(memf + '  : ' + Math.round(100 * memf / memt) + '% Used');

	for(var i = 0, len = cpus.length; i < len; i++) {
		var cpu = cpus[i], total = 0;
		for(var type in cpu.times) {
			total += cpu.times[type];
		}
			cpustat += '[' + i + ']: ' + (100 - Math.round(100 * cpu.times['idle'] / total)) + '%  ';
	}
	gvar.gvar.rpiCPU.set(cpustat);
	//GET MK STATS
	mknodecmd.mktkcmd('/system/resource/print',false,function(val){
//		console.log('raw resource',val);
		var valarry = genericArryParser(val,['free-memory','total-memory','cpu-load','uptime'],false);
		var wlcmem = valarry[1];
		var wlcmemt = valarry[2];
		gvar.gvar.wlcCPU.set(valarry[3]);
		gvar.gvar.wlcMEM.set(wlcmem + '  : ' + Math.round(100 * wlcmem / wlcmemt) + '% Used');
		gvar.gvar.uptime.set(valarry[0]);



	});
	mknodecmd.mktkcmd('/ip/address/print',false,function(val){
		var valarry = genericArryParser(val,'ether1','section');
//		console.log('asdf2  ',valarry);
		for(var i=0;i<valarry.length;i++){
			if (valarry[i].indexOf('address')!==-1){
				gvar.gvar.wlcIP.set(valarry[i].split('=address=')[1]);
				break;
			}
		}
	});
}
function getNTPTIME(ntpsrvip,cb){
	try{
		ntpClient.getNetworkTime(ntpsrvip, 123, function(err, date) {
		    if(err) {
		        console.error(err);
						cb(Date(Date.now()).toLocaleString())
					}else {
						cb(Date(date));
					}
		});
	}catch(e){
		cb(Date(Date.now()).toLocaleString());
	}
}
function appendlogs(value){
	var promise = new Promise(function(resolve,reject){
		getNTPTIME(ntpIP,function(cbval){
			resolve(cbval);
		});
	});
	promise.then(function(dte){
		const fs = require('fs');
		fs.appendFile('/tmp/aim-hw.log',dte + ' => ' +  value + '\n', function (err) {
		  if (err){
				return -1;
			};
			return true;
		});
	});
}
function load_initconfig(initKeyVAR,){
	const filepath ='/home/test/var';
	const filename = 'system.ini'
	const fs = require('fs');
	var configData = [];
	if (initKeyVAR===undefined){
		return null;
	}
	try{
		var promise = new Promise(function(resolve,reject){
			fs.readFile(filepath + '/' + filename, 'utf8', function(err, data) {
				if (err) throw err;
				var tmpdata = data.split('\n');
				console.log('ctr: ' + tmpdata.length);
				if(tmpdata.length>2){
					var tmpv1;
					var tmpv2;
					for(var i = 0;i<tmpdata.length;i++){
						if(tmpdata[i].length>2){
							tmpv1 = tmpdata[i].replace(/,/g,'');
							tmpv2 = tmpv1.replace(/;/g,'');
							tmpv1 = tmpv2.replace(/"/g,'');
							tmpv2 = tmpv1.replace(/'/g,'');
							tmpv1 = tmpv2.replace(/`/g,'');
							tmpv2 = tmpv1.replace(/ /g,'');
							configData.push(tmpv2);
						}
					}
					resolve(configData);
				}else{
					resolve(-1);
				}
		  });
		});
		promise.then(function(valarry){
			console.log('valarry ',adminconfigParser(valarry,['coinAcceptDly','okBtnDly','HTTP_PORT','coinInputDly','cval','ispactvflg','ntpIP','wlcIP','unicoinslot','ipsla1','ipsla2','ipsla3'],'json'));
		});
			return null;
	}catch(e){
		console.log('err ', e);
		return null;
	}
}
function get_sysID(greptoken, parseflg,cb){
	const exec = require( 'child_process' ).exec;
	if (greptoken.length > 0){
		exec('cat /proc/cpuinfo | grep ' + greptoken,(error,stdout,stderr) => {
		    if(error){
		        console.error( 'exec error: ',error );
		        cb(-1);
		    }
				if(parseflg){
					cb(stdout.split(': ')[1]);
				}else{
					cb(stdout);
				}
		});
	}else {
		 cb(-1);
	}
}
function getrpiIPADDR(intobj){
	var addresses = [];
	for (var k in intobj) {
	   for (var k2 in intobj[k]) {
		   var address = intobj[k][k2];
		   if (address.family === 'IPv4' && address.address !== '127.0.0.1' && !address.internal){
			   addresses.push(address.address);
		   }
	   }
	}
	if (addresses[0]){
		return addresses[0]
	}else { return 0}
}
function expressSRV(){
	appendlogs('Starting Web Service..');
	var routes = require('./src/routes/index');
	//Init app
	app.set('views',path.join(__dirname,'./src/views'));
	app.engine('handlebars',exphbs({defaultLayout:'../../src/views/layouts/layout'}));
	app.set('view engine','handlebars');
	//bodyParser Middleware

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended:false}));
	app.use(cookieParser());
	//Set Static Folder
	app.use(express.static(path.join(__dirname,'public')));
	//Express session
	app.use(session({
		secret: 'secret',
		saveUninitialized: true,
		resave: true
	}));
	//Express Validator
	app.use(expressValidator({
		errorFormatter: function(param, msg, value){
			var namespace = param.split('.')
			,root = namespace.shift()
			,formParam = root;
			while (namespace.length) {
				formParam +='[' + namespace.shift() + ']';
			}
			return {
				param: formParam,
				msg: msg,
				value: value
			};
		}
	}));
	//Connect flash
	app.use(flash());
	//Global Vars
	app.use(function(req,res,next){
	 res.locals.success_msg = req.flash('success_msg');
	 res.locals.error_msg = req.flash('error_msg');
	 res.locals.error = req.flash('error');
	 next();
	 });
	 app.use('/',routes.routes);
	//
	server.listen(HTTP_PORT);
	var wmsg = 'Server started on port ' + HTTP_PORT;
 	console.log(wmsg);
	appendlogs(wmsg+'\n');
	/*
	io.on('AIMSOCKET',function(client){
		console.log('Client connected...');
		client.on('join',function(data){
			console.log('jjjj' +data);
			client.emit('msgsrv2clnt','hellow from server');
		});
	});
	*/
	io.on('connection', function(socket){
	  console.log('a user connected');
		socket.on('disconnect', function(){
	    console.log('user disconnected');
	  });
	});
/*
	app.set('port',(process.env.PORT || 3003));
	app.listen(app.get('port'),function() {
   	console.log('Server started on port ' + app.get('port'));
 	});
*/
}

function checkipsla(cb){
	var promise = new Promise(function(resolve,reject){
		mknodecmd.mktkcmd('/ping',['=address=4.2.2.2','=count=4'],function(val){
			if (val.length>0 || val.toString().indexOf("ms")!=-1){
				resolve(1);
			}else{
				resolve(0);
			}
		});
	});
	promise.then(pipslabool2).then(pipslabool3).then(function(ctr){
		cb(ctr);
	});
}
function pipslabool2(ctr){
	return new Promise(function(resolve,reject){
		mknodecmd.mktkcmd('/ping',['=address=208.67.222.222','=count=4'],function(val){
			if (val.length>0 || val.toString().indexOf("ms")!=-1){
				resolve(ctr + 1);
			}else{
				resolve(ctr);
			}
		});
	});
}
function pipslabool3(ctr){
	return new Promise(function(resolve,reject){
		mknodecmd.mktkcmd('/ping',['=address=8.8.8.8','=count=4'],function(val){
			if (val.length>0 || val.toString().indexOf("ms")!=-1){
				resolve(ctr + 1);
			}else{
				resolve(ctr);
			}
		});
	});
}
function gethwheartbeats(hwhbdelay,cb){
	setTimeout(function(){
//		console.log("+++++hwhb delay " + hwhbdelay);
		checkipsla(function(retval){
			if(retval>1){
				if (!ispactvflg){
					flgblinkdisp1 =false;
					appendlogs('*** + with internet');
					console.log('*** + with internet');
					if(okbtn){
						setDispLEDS('+ISP',true);
					}
				}
				ispactvflg = true;
				io.emit('output',{ispSTAT:'with internet'});
			}else{
				if (ispactvflg){
					appendlogs('*** - without internet');
				}
				if(!flgblinkdisp1){
					flgblinkdisp1=true;
					blinkdisp1('-ISP',1200);
				}

				console.log('*** - without internet');
				ispactvflg = false;
				io.emit('output',{ispSTAT:'without internet'});
			}
		});
		check_HW_STAT();
		if (hwhbactiveflg){
			gethwheartbeats(20000);
		}else{
			gethwheartbeats(hwhbdelay);
		}
	},hwhbdelay)
}
function blinkdisp1(msg,delay){
	setTimeout(function(){
		if(disp1Tflg){
			setDispLEDS(msg,false);
			disp1Tflg =false;
		}else{
			max7219.cls();
			disp1Tflg = true;
		}
		if (flgblinkdisp1){
			if(delay>500){
				if (disp1Tflg){
						blinkdisp1(msg,delay-500);
				}else {
					blinkdisp1(msg,delay+500);
				}
			}else {
				blinkdisp1(msg,delay);
			}
		}
	},delay);
}
function parseata(cmd,val){
	var arrx = [];
	if (cmd='/ping'){
		for(i=0;i<4;i++){
			try{
				var tmp =val[i][10].split('=avg-rtt=');
				if (tmp.length = 2){
					arrx.push(tmp[1]);
				}
			}catch(err){
			}
		}
	}else{
		return val;
	}
	return arrx;
}
/*
raspi.init(() => {
  var serial = new Serial();
  serial.open(() => {
    serial.write('Hello from raspi-serial');
    serial.on('data', (data) => {
      process.stdout.write(data);
    });
  });
});
*/
