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
    // 1. Hide the UI container
    uiLayer.style.display = 'none';

    // 2. Locate, stop, and REMOVE the video
    const bgVideo = document.getElementById('bg-video');
    if (bgVideo) {
        bgVideo.pause();
        bgVideo.src = ""; // Clears the video source
        bgVideo.load();
        bgVideo.remove(); // Deletes the element from the page
    }

    // 3. Force the scene background to be clear
    sceneEl.style.background = "transparent";

    // 4. Show AR layers
    scannerLayer.style.display = 'flex';
    iconLayer.style.display = 'flex';

    // 5. Start the engine
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
