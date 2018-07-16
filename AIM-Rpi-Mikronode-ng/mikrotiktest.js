var MikroNode = require('mikronode-ng');
var randomstring = require('randomstring');

var strRandom = randomstring.generate(4);

GenUser(strRandom);
console.log ("test");

function GenUser(strRandom) {
    var connection = MikroNode.getConnection('131.101.179.4', 'admin', '');
    connection.closeOnDone = true;

    connection.connect(function(conn) {
        var chan = conn.openChannel();
        chan.closeOnDone = true;
        try
        {
			chan.write(['/ip/hotspot/user/add', '=name=' + strRandom], function(c) {

				c.on('trap', function(data) {
					console.log(data);
				});
				c.on('done', function(data) {
					console.log(strRandom	)

					var parsed = MikroNode.parseItems(data);

					parsed.forEach(function(item) {
						console.log('name:' + item.user);
					});

				});

			});
		}catch(e){
			console.log('error e',e);
		}
        
    });
}
