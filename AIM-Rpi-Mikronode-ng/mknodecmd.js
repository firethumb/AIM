var MikroNode = require('mikronode-ng');
var randomstring = require('randomstring');
var WLC_IPADDR = '131.101.179.4';
var WLC_USERNAME = 'admin';
var WLC_PASSWORD = '';
/*
var strRandom = randomstring.generate(4);
var uptimelim = '03:00:00';
var byteslim = '2M';
var paramdata = ['=name=' + strRandom,'=limit-uptime='+uptimelim,'=limit-bytes-total='+byteslim];
GenUser(paramdata);
*/

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
	try {
		var connection = MikroNode.getConnection(WLC_IPADDR, WLC_USERNAME,WLC_PASSWORD);
	} catch (e) {
		console.log('err ', e);
	}
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
										cb(parsemkdata(cmd,data));
									});
								});
					}else{
						chan.write(cmd, function(c) {
							c.on('trap', function(data) {
								cb(['trap',data]);
							});
							c.on('done', function(data) {
								cb(parsemkdata(cmd,data));
							});
						});
					}
				}catch(e){
					console.log('error ',e);
					cb(['err',e]);
				}
    });
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
module.exports = {GenUser,mktkcmd};
