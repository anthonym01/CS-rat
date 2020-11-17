const axios = require("axios");//comunication with python sub process on port 5088
const video_element = document.getElementById("webcam_preview")
document.getElementById("stop_video").addEventListener('click', function () { camanager.stop_webcam() })
document.getElementById("start_video").addEventListener('click', function () { camanager.start_webcam() })

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
        let keys = await axios.get('http://localhost:5088/key');
        console.log(keys)
    },
    stop_get_keys: async function () {
        clearInterval(keylog.interval);
    }
}


/* Directories */
