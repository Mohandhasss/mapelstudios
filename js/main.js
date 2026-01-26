document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const ui = document.getElementById('ui');
    const scanner = document.getElementById('scanner-container');
    const icons = document.getElementById('icon-layer');
    const sceneEl = document.querySelector('a-scene');
    
    const targetEntity = document.getElementById('target');
    const arVideo = document.getElementById('ar-video');

    // 1. Map Target Index to Video filename
    // You can name your videos assets/video0.mp4, assets/video1.mp4, etc.
    const getVideoPath = (index) => `assets/video${index}.mp4`;

    startBtn.addEventListener('click', () => {
        ui.style.display = 'none';
        scanner.style.display = 'flex';
        icons.style.display = 'flex';
        sceneEl.systems['mindar-image-system'].start();
    });

    // 2. Dynamic Loading Logic
    targetEntity.addEventListener("targetFound", (event) => {
        const index = targetEntity.getAttribute('mindar-image-target').targetIndex;
        console.log("Target Found: Index " + index);
        
        // Hide scanner and load the specific video for this target
        scanner.style.display = 'none';
        arVideo.setAttribute('src', getVideoPath(index));
        arVideo.load();
        arVideo.play();
    });

    targetEntity.addEventListener("targetLost", () => {
        console.log("Target Lost");
        scanner.style.display = 'flex';
        arVideo.pause();
    });
});
