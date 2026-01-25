document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const ui = document.getElementById('ui');
    const hud = document.getElementById('hud-container');
    const iconLayer = document.getElementById('client-icon-layer');
    const scannerVideo = document.getElementById('scanner-video');
    const sceneEl = document.querySelector('a-scene');

    startBtn.addEventListener('click', () => {
        ui.style.display = 'none';
        hud.style.display = 'block';
        iconLayer.style.display = 'flex';
        sceneEl.systems['mindar-image-system'].start();
        scannerVideo.play();
    });
});
