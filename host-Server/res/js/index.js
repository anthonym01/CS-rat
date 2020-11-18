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

})
