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
    // 1. Hide the entire landing UI container
    uiLayer.style.display = 'none';

    // 2. Hide and stop the background video specifically
    const bgVideo = document.getElementById('bg-video');
    if (bgVideo) {
        bgVideo.pause(); // Stop playback to save battery
        bgVideo.style.display = 'none'; // Remove it from view
    }

    // 3. Show AR-specific UI layers
    scannerLayer.style.display = 'flex';
    iconLayer.style.display = 'flex';

    // 4. Start the AR engine
    if (sceneEl.systems['mindar-image-system']) {
        sceneEl.systems['mindar-image-system'].start();
    }
});

    targetEntity.addEventListener("targetFound", () => {
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
