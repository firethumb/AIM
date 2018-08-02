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

const pisoval = 12;
//const raspi = require('raspi');
//const Serial = require('raspi-serial').Serial;
var Gpio = require('onoff').Gpio
var coin_waitflg = false;
var cvaldly = false;
var cval = 0;

var gvar = require('./src/routes/index');

const RPI_IPADDR = '131.101.179.4';
const RPI_USERNAME = 'admin';
const RPI_PASSWORD = '';
const VoucherNum = 4;

var mknodecmd = require('./mknodecmd');
var hwhbactiveflg = false;
var timeoutHndler = [];
var cointHndler = [];

sysinitfn();
gethwheartbeats(10000);
getcoinINT();
function sysinitfn(){
	max7219.setBrightness(6);
	max7219.setBrightness(6);
	max7219.setBrightness(6);
	max7219.clear();
	max7219.cls();
	//
	coin_waitflg = false;
	cvaldly = false;
	cval = 0;
	hwhbactiveflg = false;
	timeoutHndler = [];
	cointHndler = [];
	gvar.gvar.income.set(0);
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
	return result;
}
function setDispLEDS(valueobj){
	var vararry=[];
	if(typeof valueobj=== 'string'){
		for(var i=0;i<valueobj.length;i++){
			vararry.push(valueobj.charAt(i));
		}
	}else if(Object.prototype.toString.call(valueobj) === '[object Array]') {
		vararry = valueobj;
	}else{ return false};
	try{
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
	console.log('coinval d1 ' + coinval);
	for (;((coinval>=20)&&(i<5));i++){
		coinval = coinval - 20;
	}
	console.log('coinval d2 ' + coinval);
	console.log('i       d3 ' + i);
	if(i>0){
		uptlim = i+'d ';
	}
	uptlim = uptlim + pisoconversionfn(coinval);
	console.log('kkkkkk    ' + strRandom + "  Lim  " + uptlim);
	setDispLEDS(strRandom);
	mknodecmd.GenUser(['=name=' + strRandom,'=limit-uptime='+uptlim]);
}
function pisoconversionfn(value){
	if (value<=0){return '00:00:00';}
	var tmpv = pisoval * value;
	var i = 0;
//	console.log('tmpv    d4 ' + tmpv);
	for (;tmpv>=60;i++){
		tmpv = tmpv - 60;
	}
//	console.log('tmpv    d5 ' + tmpv);
//	console.log('i       d6 ' + i);
	if (tmpv>=10){
		return '0'+i+':'+tmpv+':00';
	}
	return '0'+i+':0'+tmpv+':00';
}
function getcoinINT(){
	console.log('Please press the button on GPIO #18...');
//	var blinkInterval = setInterval(blinkLED, 250); //run the blinkLED function every 250ms
	var LED = new Gpio(4, 'out'); //use GPIO pin 4, and specify that it is output

	button = new Gpio(17, 'in', 'both');
	button.watch(function (err, value) {
		if (err) throw err;

		console.log('GPIO coin: ' + value);
		//LED.writeSync(value);
		if(value == 1){
			cval++;
			setDispLEDS('#'+cval);
		}
		if(cvaldly){
/*			if (coin_waitflg){
				setTimeout(updtecval(),9000);
			}else{
			}
*/			console.log('+++**** true');
			clearTimeout(timeoutHndler);
			timeoutHndler = setTimeout(cvaldlyfn,2000);
			clearTimeout(cointHndler);
		}
		else{
			console.log('+++**** false');
			cvaldly = true;
			timeoutHndler = setTimeout(cvaldlyfn,2000);
		}
		//button.unexport(); // Unexport GPIO and free resources
	});
}
function cvaldlyfn(){
	console.log('++++++++++++++++++++++++++++++++++++done cval:  ' + cval);
	cvaldly = false;
	if (coin_waitflg){
		clearTimeout(cointHndler);
		cointHndler = setTimeout(coinwdlyfn,3000);

	}else{
		coin_waitflg = true;
		cointHndler = setTimeout(coinwdlyfn,3000);
	}
}
function coinwdlyfn(){
	console.log('++++++++$$$$$$$$$$$$$$$$$$$$$$$$$$$$44 final cval:  ' + cval);
	coin_waitflg = false;
	var amt = gvar.gvar.income.get() + cval;
	gvar.gvar.income.set(amt);
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
	//    console.log("CPU %s:", i);

		var cpu = cpus[i], total = 0;

		for(var type in cpu.times) {
			total += cpu.times[type];
		}
			cpustat += '[' + i + ']: ' + (100 - Math.round(100 * cpu.times['idle'] / total)) + '%  ';
		/*
		for(type in cpu.times) {
			console.log("\t",type, Math.round(100 * cpu.times[type] / total));
		}
		*/
	}
	gvar.gvar.rpiCPU.set(cpustat);
	//console.log('gvar', gvar.gvar.rpiCPU.get());

	//GET MK STATS
	mknodecmd.mktkcmd('/system/resource/print',false,function(val){
		var valarry = genericArryParser(val,['free-memory','cpu-load','uptime'],false);
		gvar.gvar.wlcCPU.set(valarry[2]);
		gvar.gvar.wlcMEM.set(valarry[1]);
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

gvar.gvar.rpiIP.set(getrpiIPADDR(os.networkInterfaces()));

/*
max7219.setBrightness(7);
max7219.setBrightness(7);
max7219.setBrightness(7);
max7219.clear();
max7219.cls();
*/
/*
max7219.letterx('A',1);
max7219.letterx('I',2);
max7219.letterx('M',3);
max7219.letterx(3,4);
*/
expressSRV();
//webserver();


//jsloop(3000);
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
	server.listen(3002);
	console.log('starting sockets connection...');
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
				console.log('with internet');
				io.emit('output',{ispSTAT:'with internet'});
			}else{
				console.log('without internet');
				io.emit('output',{ispSTAT:'without internet'});
			}
		});
		check_HW_STAT();
		if (hwhbactiveflg){
			gethwheartbeats(10000);
		}else{
			gethwheartbeats(hwhbdelay);
		}
	},hwhbdelay)
}
function parsemkdata(cmd,val){
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
