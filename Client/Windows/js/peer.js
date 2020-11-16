let peer = new Peer();
var conn = peer.connect('anthonym_1999_peer_cs_rat');
// on open will be launch when you successfully connect to PeerServer

peer.on('open', function (id) {
    console.warn('peer ID is: ' + id);
});

peer.on('connection', function (conn) {
    conn.on('data', function (data) {
        // Will print 'hi!'
        console.warn('data Received from partner', data);
    });
});
