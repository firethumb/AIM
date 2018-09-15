var sys = require('util')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) {
	if (error) throw error;
	if (stderr) throw stderr;
	console.log('stdout',stdout);
	//var retval = stdout.slice(stdout.indexOf("received,")+10,stdout.indexOf("packet "));
	//cb(retval);
	var arry = stdout.split('\n');
	for(var i=0;i<arry.length;i++){
		var tmparr1='  ';
		var tmparr2=arry[i];
		var flg=false;
		if(tmparr2.indexOf('UG')!=-1){
			for(var j=0;j<100;j++){
				if(tmparr1.indexOf('  ')!=-1){
					tmparr1=tmparr2.replace(/  /g,' ');
				}
				else{
					flg=true;
					break;
				}
				tmparr2=tmparr1;
			}
			if(flg){
				var rst=tmparr1.split(' ');
				console.log('rst ',rst);
				break;
			}
		}
	}
}
try {
	exec('route -n', puts);
} catch (e) {
	cb(-1);
}
