document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const uiLayer = document.getElementById('ui');
    const scannerLayer = document.getElementById('scanner-container');
    const iconLayer = document.getElementById('icon-layer'); // Added reference
    const sceneEl = document.querySelector('a-scene');
    const targetEntity = document.getElementById('target');
    const arVideo = document.getElementById('ar-video');

    const getVideoPath = (idx) => `assets/video${idx}.mp4`;

    startBtn.addEventListener('click', () => {
    // Hide the landing UI
    uiLayer.style.display = 'none';

    // Hide the video normally
    const bgVideo = document.getElementById('bg-video');
    if (bgVideo) {
        bgVideo.style.display = 'none';
        bgVideo.pause();
    }

    // Show AR tools
    scannerLayer.style.display = 'flex';
    iconLayer.style.display = 'flex';

    // Start Engine
    sceneEl.systems['mindar-image-system'].start();
});
    etEntity.addEventListener("targetFound", () => {
        const index = targetEntity.getAttribute('mindar-image-target').targetIndex;
        scannerLayer.style.display = 'none';
        arVideo.setAttribute('src', getVideoPath(index));
        arVideo.load();
        arVideo.play();
    });

    targetEntity.addEventListener("targetLost", () => {
        scannerLayer.style.display = 'flex';
        arVideo.pause();
    });
});
