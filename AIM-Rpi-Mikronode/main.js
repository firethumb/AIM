var MikroNode = require('./dist/mikronode.js');
// Create API instance to a host.
var device = new MikroNode('131.101.179.4');
// device.setDebug(MikroNode.DEBUG);
var loopstat=true;
console.log("END of Command");
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
				channel1.write(cmd,params).then(data=>{
			//	console.log("Done",JSON.stringify(data));
				var resultstr = data.data[3][4].field + "=" +data.data[3][4].value
				console.log("result: " + resultstr);
				console.log("standby operation = " + (resultstr == "packet-loss=100"));
				cb(resultstr);
			}).catch(error=>{
				console.log("Error result ",error);
			});

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
