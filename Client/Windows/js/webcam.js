/* web camera functionality */

let webcam_stream = document.getElementById("webcam_preview");
document.getElementById("stop_video").addEventListener('click', function () { stop_webcam_stream() });
document.getElementById("start_video").addEventListener('click', function () { start_webcam_stream() });

//Get data from webcam
function start_webcam_stream() {
    if (navigator.mediaDevices.getUserMedia) {//Media devices
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })//Get video stream from default webcam
            .then(function (stream) {
                console.log('Stream started: ', stream)
                webcam_stream.srcObject = stream;//video stream
            })
            .catch(function (err0r) {
                console.warn('Stream failed', err0r);
            });
    }
}

//stop getting data 
function stop_webcam_stream() {
    var stream = webcam_stream.srcObject;
    var tracks = stream.getTracks();

    for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        track.stop();
    }

    webcam_stream.srcObject = null;
}