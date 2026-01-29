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
    uiLayer.style.display = 'none';
    
    const bgVideo = document.getElementById('bg-video');
    if (bgVideo) bgVideo.style.display = 'none';

    scannerLayer.style.display = 'flex';
    iconLayer.style.display = 'flex';

    // Check if the system exists before starting
    if (sceneEl.systems['mindar-image-system']) {
        console.log("Starting AR Engine...");
        sceneEl.systems['mindar-image-system'].start(); 
    } else {
        console.error("AR System not found!");
    }

    // Force a resize to fix that 40% cropping issue
    setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
    }, 500);
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
