let peer = new Peer();
var conn = peer.connect('anthonym_1999_peer_cs_rat');
// on open will be launch when you successfully connect to PeerServer

peer.on('open', function (id) {
    console.warn('peer ID is: ' + id);
});

conn.on('open', function () {
    console.warn('Other pair connected', conn.id);
    // here you have conn.id
    conn.send('hi from timetable!');
});
