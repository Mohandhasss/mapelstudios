document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.querySelector('#start-btn');
    const ui = document.querySelector('#ui');
    const hud = document.querySelector('#hud-container');
    const iconLayer = document.querySelector('#client-icon-layer');
    const arVideo = document.querySelector('#ar-video');
    const scannerVideo = document.querySelector('#scanner-video');
    const sceneEl = document.querySelector('a-scene');
    const target = document.querySelector('#target');

    startBtn.addEventListener('click', () => {
        ui.style.display = 'none';
        hud.style.display = 'block';
        iconLayer.style.display = 'flex'; // Shows the round buttons

        sceneEl.systems['mindar-image-system'].start();
        scannerVideo.play();
    });

    target.addEventListener("targetFound", () => {
        hud.style.display = 'none';
        arVideo.play();
    });

    target.addEventListener("targetLost", () => {
        hud.style.display = 'block';
        arVideo.pause();
    });
});
