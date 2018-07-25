var MikroNode = require('mikronode-ng');
var randomstring = require('randomstring');
const RPI_IPADDR = '';
const RPI_USERNAME = 'admin';
const RPI_PASSWORD = '';


var strRandom = randomstring.generate(4);
var uptimelim = '03:00:00';
var byteslim = '2M';
var paramdata = ['=name=' + strRandom,'=limit-uptime='+uptimelim,'=limit-bytes-total='+byteslim];


//GenUser(paramdata);

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

module.exports = {GenUser,mktkcmd};
