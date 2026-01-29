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
    // 1. Hide the Landing UI
    uiLayer.style.display = 'none';
    
    // 2. Hide the landing video
    const bgVideo = document.getElementById('bg-video');
    if (bgVideo) {
        bgVideo.pause();
        bgVideo.style.display = 'none';
    }

    // 3. Show AR UI
    scannerLayer.style.display = 'flex';
    iconLayer.style.display = 'flex';

    // 4. THE FIX: Wait for A-Frame to be ready before starting MindAR
    if (sceneEl.hasLoaded) {
        startAR();
    } else {
        sceneEl.addEventListener('loaded', startAR);
    }
});

function startAR() {
    const arSystem = sceneEl.systems['mindar-image-system'];
    if (arSystem) {
        arSystem.start(); // This triggers the camera permission
        
        // Fix the 40% cropping issue by forcing a resize
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 500);
    }
}
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
