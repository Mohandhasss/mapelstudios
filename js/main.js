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
    
    // Hide landing video
    const bgVideo = document.getElementById('bg-video');
    if (bgVideo) bgVideo.style.display = 'none';

    // Show AR layers
    scannerLayer.style.display = 'flex';
    iconLayer.style.display = 'flex';

    // Start AR
    sceneEl.systems['mindar-image-system'].start();

    // ADD THIS: Forces the browser to recalculate the camera size
    setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
    }, 300); 
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
