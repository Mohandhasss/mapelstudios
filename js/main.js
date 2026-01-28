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
    // 1. Hide the entire landing UI layer
    const uiLayer = document.getElementById('ui');
    if (uiLayer) {
        uiLayer.style.display = 'none';
    }

    // 2. Target and REMOVE the background video immediately
    const bgVideo = document.getElementById('bg-video');
    if (bgVideo) {
        bgVideo.pause();
        bgVideo.src = ""; // Clear source to free memory
        bgVideo.load();
        bgVideo.remove(); // This deletes it from the page entirely
    }

    // 3. Show AR specific layers
    scannerLayer.style.display = 'flex';
    iconLayer.style.display = 'flex';

    // 4. Start AR Engine
    sceneEl.systems['mindar-image-system'].start();
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
