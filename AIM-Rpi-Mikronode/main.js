var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require ('express-handlebars');
var expressValidator =  require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var MikroNode = require('./dist/mikronode.js');
// Create API instance to a host.
var device = new MikroNode('192.168.88.1');
// device.setDebug(MikroNode.DEBUG);
var loopstat=true;
//jsloop(2000);
/*
mktkcmd('/ping',{address:'4.2.2.2',count:4},function(val){
console.log("cba " + val);
});
*/

/*
mktkcmd('/ip/hotspot/user/add',{name:'test','limit-uptime':'00:30:00',disabled:'no',profile:'default','limit-bytes-total':'1M'},function(val){
console.log("cba " + val);
});


mktkcmd('/ip/hotspot/user/print',"",function(val){
console.log("cba ", JSON.stringify(val));
});
*/

console.log("END of Command");
expressSRV();
function expressSRV(){
	var routes = require('./src/routes/index');
	var users = require('./src/routes/users');
	//Init app
	var app = express();
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
	 app.use('/',routes);
	//
	app.set('port',(process.env.PORT || 3002));
	app.listen(app.get('port'),function() {
   	console.log('Server started on port ' + app.get('port'));
 	});
}
var infunc = function(sval){
  console.log("clicked");
}

/*
webserver();

var loopctr = 1;

function webserver(){
	var http = require('http').createServer(handler); //require http server, and create server with function handler()
	var fs = require('fs'); //require filesystem module
	var io = require('socket.io')(http) //require socket.io module and pass the http object (server)
	var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
	var LED = new Gpio(4, 'out'); //use GPIO pin 4 as output
	var pushButton = new Gpio(17, 'in', 'both'); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled

	http.listen(8080); //listen to port 8080

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
function mktkcmd(cmd,params,cb){

	// Connect to MikroTik device
	device.connect().then(([login])=>login('admin','')).then(conn=>{
			// When all channels are marked done, close the connection.
			console.log('connected');

			conn.closeOnDone(true);

			var channel1=conn.openChannel();
			channel1.closeOnDone(true);
			//console.log("test   : ",cmd);
			if(params){
				channel1.write(cmd,params).then(data=>{
			//	console.log("Done",JSON.stringify(data));
					if(cmd=='/ping'){
						var resultstr = data.data[3][4].field + "=" +data.data[3][4].value
						console.log("result: " + resultstr);
						console.log("standby operation = " + (resultstr == "packet-loss=100"));
						cb(resultstr);
						console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
					}else{
						cb(data);
					}
				}).catch(error=>{
					console.log("Error result ",error);
				});
			}else{
				console.log("---------------------------------------------------------");
				channel1.write(cmd).then(data=>{
			//	console.log("Done",JSON.stringify(data));
					if(cmd=='/ping'){
						var resultstr = data.data[3][4].field + "=" +data.data[3][4].value
						console.log("result: " + resultstr);
						console.log("standby operation = " + (resultstr == "packet-loss=100"));
						cb(resultstr);
					}else{
						cb(data);
					}
				}).catch(error=>{
					console.log("Error result ",error);
				});
			}

			/*
			channel1.write('/tool/ping',params);
			channel1.data.subscribe(function(response) {
				console.dir(MikroNode.resultsToObj(response));
			});
			*/
			console.log('Wrote');
		}
	).catch(error=>{
		console.log("Error logging in ",error);
	});
}
