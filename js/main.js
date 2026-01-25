document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const ui = document.getElementById('ui');
    const hud = document.getElementById('hud-container');
    const icons = document.getElementById('icon-layer');
    const scannerVideo = document.getElementById('scanner-video');
    const sceneEl = document.querySelector('a-scene');

    startBtn.addEventListener('click', () => {
        ui.style.display = 'none';
        hud.style.display = 'block';
        icons.style.display = 'flex';
        sceneEl.systems['mindar-image-system'].start();
        scannerVideo.play();
    });
// This forces the video background to stay transparent on mobile browsers
const scannerV = document.getElementById('scanner-video');
scannerV.addEventListener('play', () => {
    scannerV.style.backgroundColor = 'transparent';
    // Forces a re-render of the blending mode
    scannerV.style.display = 'none';
    scannerV.offsetHeight; 
    scannerV.style.display = 'block';
});
