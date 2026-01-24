document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.querySelector('#start-btn');
    const ui = document.querySelector('#ui');
    const hud = document.querySelector('#hud-container');
    const video = document.querySelector('#ar-video');
    const scannerVideo = document.querySelector('#scanner-video');
    const sceneEl = document.querySelector('a-scene');
    const target = document.querySelector('#target');

    startBtn.addEventListener('click', () => {
        ui.style.display = 'none';
        hud.style.display = 'block';

        // Start AR
        sceneEl.systems['mindar-image-system'].start();
        
        // Play scanner overlay
        scannerVideo.play();
    });

    target.addEventListener("targetFound", () => {
        hud.style.display = 'none';
        video.play();
    });

    target.addEventListener("targetLost", () => {
        hud.style.display = 'block';
        video.pause();
    });
});
