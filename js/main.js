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
        // Hide the scanner when the video appears
        scanner.style.display = 'none';
        if (arVideo) arVideo.play();
    });

    targetEntity.addEventListener("targetLost", () => {
        // Bring back the scanner when tracking is lost
        scanner.style.display = 'flex';
        if (arVideo) arVideo.pause();
    });
});
