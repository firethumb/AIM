var MikroNode = require('./dist/mikronode.js');
// Create API instance to a host.
var device = new MikroNode('192.168.88.1');
// device.setDebug(MikroNode.DEBUG);

// Connect to MikroTik device
device.connect().then(([login])=>login('admin','')).then(conn=>{
		// When all channels are marked done, close the connection.
	    console.log('connected');

		conn.closeOnDone(true);

		var channel1=conn.openChannel();
		channel1.closeOnDone(true);

		console.log('going write 1');

		// get only a count of the addresses.

			channel1.write('/ping',{address:'4.2.2.2',count:4,size:32}).then(data=>{
			//console.log("Done",JSON.stringify(data));
			var resultstr = data.data[3][4].field + "=" +data.data[3][4].value
			console.log("result: " + resultstr);
			console.log("standby operation = " + (resultstr == "packet-loss=100"));

		}).catch(error=>{
			console.log("Error result ",error);
		});

		/*
		channel1.write('/tool/ping',{address:'4.2.2.2',count:3});
		channel1.data.subscribe(function(response) {
			console.dir(MikroNode.resultsToObj(response));
		});
		*/
		console.log('Wrote');
	}
).catch(error=>{
	console.log("Error logging in ",error);
});
