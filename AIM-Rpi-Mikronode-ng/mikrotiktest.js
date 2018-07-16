var MikroNode = require('mikronode-ng');
var randomstring = require('randomstring');

var strRandom = randomstring.generate(4);

GenUser(strRandom, '/ip/hotspot/active/print');

function GenUser(strRandom, cmd) {
    var connection = MikroNode.getConnection('192.168.10.1', 'admin', '');
    connection.closeOnDone = true;

    connection.connect(function(conn) {
        var chan = conn.openChannel();
        chan.closeOnDone = true;
        chan.write([cmd], function(c) {

            c.on('trap', function(data) {
                console.log(data);
            });
            c.on('done', function(data) {
                console.log(strRandom)

                var parsed = MikroNode.parseItems(data);

                parsed.forEach(function(item) {
                    console.log('name:' + item.user);
                });

            });

        });
    });
}
