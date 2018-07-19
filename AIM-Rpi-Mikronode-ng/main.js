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
var MikroNode = require('mikronode-ng');
var randomstring = require('randomstring');
var os = require('os');
var randomstring = require('randomstring');
const raspi = require('raspi');
const Serial = require('raspi-serial').Serial;

var gvar = require('./src/routes/index');

const RPI_IPADDR = '';
const RPI_USERNAME = 'admin';
const RPI_PASSWORD = '';

var mknodecmd = require('./mknodecmd');

//console.log(os.cpus());
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
var strRandom = randomstring.generate(4);
var uptimelim = '03:00:00';
var byteslim = '2M';
var paramdata = ['=name=' + strRandom,'=limit-uptime='+uptimelim,'=limit-bytes-total='+byteslim];

//mknodecmd.GenUser(paramdata);

var cpus = os.cpus();
var cpustat = "CPU's: ";
var memt = os.totalmem();
var memf = os.freemem();
gvar.gvar.rpiMEM.set(memf + '  : ' + Math.round(100 * memf / memt) + '% Used');
gvar.gvar.rpiIP.set(getrpiIPADDR(os.networkInterfaces()));
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
console.log('cpustat',cpustat);
gvar.gvar.rpiCPU.set(cpustat);
console.log('gvar', gvar.gvar.rpiCPU.get());
var loopstat=true;
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
/*
max7219.letterx('B',1);
max7219.letterx('P',2);
max7219.letterx('I',3);
max7219.letterx('T',4);
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
	var app = express();
	var server = require('http').createServer(app);
	var io = require('socket.io')(server);
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
	server.listen(80);
	console.log('starting sockets connection...');
	io.on('connection',function(client){
		console.log('Client connected...');
		client.on('join',function(data){
			console.log(data);
			client.emit('messages','hellow from server');
		});

	});
/*	
	app.set('port',(process.env.PORT || 3003));
	app.listen(app.get('port'),function() {
   	console.log('Server started on port ' + app.get('port'));
 	});
*/
	
}
/*
function webserver(){
	var http = require('http').createServer(handler); //require http server, and create server with function handler()
	var fs = require('fs'); //require filesystem module
	var io = require('socket.io')(http) //require socket.io module and pass the http object (server)
	var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
	var LED = new Gpio(4, 'out'); //use GPIO pin 4 as output
	var pushButton = new Gpio(17, 'in', 'both'); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled

//	http.listen(8080); //listen to port 8080

	function handler (req, res) { //create server
	  fs.readFile(__dirname + '/public/index.html', function(err, data) { //read file index.html in public folder
		if (err) {
		  res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
		  return res.end("404 Not Found");
		}
		res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
		res.write(data); //write data from index.html
		return res.end();
	  });
	}

	io.sockets.on('connection', function (socket) {// WebSocket Connection
	  var lightvalue = 0; //static variable for current status
	  pushButton.watch(function (err, value) { //Watch for hardware interrupts on pushButton
		if (err) { //if an error
		  console.error('There was an error', err); //output error message to console
		  return;
		}
		lightvalue = value;
		socket.emit('light', lightvalue); //send button status to client
	  });
	  socket.on('light', function(data) { //get light switch status from client
		lightvalue = data;
		if (lightvalue != LED.readSync()) { //only change LED if status has changed
		  LED.writeSync(lightvalue); //turn LED on or off
		  loopstat = lightvalue;
		  console.log("lightvalue = " + lightvalue);
		  if (loopstat) {
			  jsloop(4000);
		  }
		}
	  });
	});

	process.on('SIGINT', function () { //on ctrl+c
	  LED.writeSync(0); // Turn LED off
	  LED.unexport(); // Unexport LED GPIO to free resources
	  pushButton.unexport(); // Unexport Button GPIO to free resources
	  process.exit(); //exit completely
	});
}
*/
function jsloop(delay){
	setTimeout(function(){
		console.log("++++++++++++++++++++++++++++++ LOOP delay " + delay);
		mktkcmd('/ping',{address:'4.2.2.2',count:4},function(val){
		console.log("cba " + val);
		});
		if (loopstat){
			jsloop(delay);
		}
	},delay)
}
function GenUser(userparams){
	if(userparams){
		mktkcmd('/ip/hotspot/user/add',userparams,function(cbval){
			console.log("cbval " + cbval);
		});
		return 'ok';
	}else{
		return 'Missing value, user params required!';
	}
}
function mktkcmd(cmd,params,cb){
	var connection = MikroNode.getConnection(RPI_IPADDR, RPI_USERNAME,RPI_PASSWORD);
    connection.closeOnDone = true;
    connection.connect(function(conn) {
        try
        {
			var chan = conn.openChannel();
			chan.closeOnDone = true;        
			if(params){
				chan.write([cmd].concat(params), function(c) {
							c.on('trap', function(data) {
								cb(['trap',data]);
							});
							c.on('done', function(data) {
								cb('done',data);
							});
						});
			}else{
				chan.write(cmd, function(c) {
					c.on('trap', function(data) {
						cb(['trap',data]);
					});
					c.on('done', function(data) {
						cb('done',data);
					});
				});
			}
			
		}catch(e){
			cb(['err',e]);
		}
    });
}
