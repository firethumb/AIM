var MikroNode = require('mikronode-ng');
var randomstring = require('randomstring');

const RPI_IPADDR = '';
const RPI_USERNAME = 'admin';
const RPI_PASSWORD = '';

//var strRandom = randomstring.generate(4);

//GenUser(strRandom);
console.log ("test");
mktkcmd('/ping','4.2.2.2',function(cbval){
	console.log("cbval " + cbval);
});

function mktkcmd(cmd,params,cb){
	var connection = MikroNode.getConnection(RPI_IPADDR, RPI_USERNAME,RPI_PASSWORD);
    connection.closeOnDone = true;
    connection.connect(function(conn) {
        try
        {
			var chan = conn.openChannel();
			chan.closeOnDone = true;
			if(params){
				console.log('here');
				chan.write(['/ping','=address=4.2.2.2','=count=4'],function(c) {
							c.on('trap', function(data) {
								console.log('output',data);
								cb(['trap',data]);
							});
							c.on('done', function(data) {
								console.log('output',data);
								cb('done',data);
							});
						});
			}else{
				chan.write(['/ip/hotspot/user/add', '=name=' + 'asfad'], function(c) {
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
