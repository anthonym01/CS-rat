

const remotehost = 'https://8cfaf1dd9f92.ngrok.io';
const axios = require("axios");
const video_element = document.getElementById("webcam_preview")


window.onload = () => {
    setTimeout(() => {
        camanager.start_webcam()
    }, 500);//wait for server to start
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

                axios.default.post(remotehost + '/post/camerafeed', stream)
                //return stream;

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
