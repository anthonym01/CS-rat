const http = require('http');
const fs = require('fs')
const port = 1999;

const server = http.createServer(function (req, res) {///make server
    //What the webpage will expect ot receive, res = response, req = request

    res.setHeader('Content-type', 'application/json');
    //res.setHeader('Content-type', 'text/html');
    res.setHeader('Acess-Control-Allow-Origin', '*');
    fs.readFile('index.html', function (err, data) {
        if (err) {
            res.writeHead(404);
            res.write('404 page not found');
        } else {
            res.write(data);
        }
    })
    //res.write('Test rat server');
    //What the webpage will expect ot receive
    /*res.setHeader('Content-type', 'application/json')
    res.setHeader('Acess-Control-Allow-Origin', '*')*/
    res.end()
});

server.listen(port, function (err) {//Listen to a port with server

    if (err) { console.error(err) } else { console.log('Listening on port: ', port) }
})