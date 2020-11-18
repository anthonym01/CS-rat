//run 'node server.js' to run

const http = require('http');//needed for communication
//const https = require('https');//needed for secure communication
const fs = require('fs');//read files
const port = 1999;//port for the server


function notfoundpage(res, url) {//404 page goes here
    res.writeHead(404);//write head 404 so the client expects an error message
    res.write('404, code: ' + url);
    console.error('File not found: ', url)
}

///Create server
const server = http.createServer(function (req, res) {
    //What the webpage will expect ot receive, res = response, req = request

    console.log('Request Url: ', req.url);
    //console.log('Raw rsponse: ',res)

    res.setHeader('Acess-Control-Allow-Origin', '*');//allow access control from client, this will automatically handle most media files

    if (req.url == '/' || req.url == '/index.html') {//requested url at the start of the site

        res.setHeader('Content-type', 'text/html');//Set the header to html, so the client will expects a html document
        res.writeHead(200);//200 ok
        fs.readFile('index.html', function (err, data) {//read index.html file
            if (err) {//error because file not found/inaccesible
                notfoundpage(res, 'index');//show 404 page
            } else {//File read successful
                res.write(data);//respond with data from file
            }
            res.end();//end response
        })

    } else {//requested url is not the starting point

        if (req.url.indexOf('.css') != -1) {//requested url is a css file
            res.setHeader('Content-type', 'text/css');//Set the header to css, so the client will expects a css document
        }
        else if (req.url.indexOf('.js') != -1) { //requested url is a js file
            res.setHeader('Content-type', 'application/javascript');//Set the header to javascript, so the client will expects a javascript document
        }
        else if (req.url.indexOf('.html') != -1) {//requested url is a html file
            res.setHeader('Content-type', 'text/html');//Set the header to html, so the client will expects a html document
        } else {
            //media handled automatically
        }

        res.writeHead(200);//200 ok
        fs.readFile(req.url.replace('/', ''), function (err, data) {//read req.url.replace('/', '') file
            if (err) {//error because file not found/inaccesible
                notfoundpage(res, req.url);//show 404 page
            } else {
                res.write(data);//respond with data from file
            }
            res.end();//end response
        })
    }

}).listen(port, function (err) {//Listen to a port with server

    if (err) {
        console.error(err);
    } else {
        console.log('Listening on port: ', port);
    }

})
