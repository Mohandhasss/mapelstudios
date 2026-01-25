document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const ui = document.getElementById('ui');
    const scanner = document.getElementById('scanner-container');
    const icons = document.getElementById('icon-layer');
    const sceneEl = document.querySelector('a-scene');
    const targetEntity = document.getElementById('target');
    const arVideo = document.getElementById('ar-video');

    startBtn.addEventListener('click', () => {
        ui.style.display = 'none';
        scanner.style.display = 'flex';
        icons.style.display = 'flex';
        sceneEl.systems['mindar-image-system'].start();
    });

    targetEntity.addEventListener("targetFound", () => {
        scanner.style.display = 'none'; // Clear the screen for the AR content
        if (arVideo) arVideo.play();
    });

    targetEntity.addEventListener("targetLost", () => {
        scanner.style.display = 'flex'; // Bring back the scan box if user moves
        if (arVideo) arVideo.pause();
    });
});
