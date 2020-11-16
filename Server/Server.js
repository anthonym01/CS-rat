const http = require('http');

const server = http.createServer(function (req, res) {///make server
    // res = response, req = request

    //What the webpage will expect ot receive (similar to csp)
    res.setHeader('Content-type', 'application/json')
    res.setHeader('Acess-Control-Allow-Origin', '*')

});

server.listen(1999, function () {//Listen to a port
    console.log('Listening on port 1999');
})