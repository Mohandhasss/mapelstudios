document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const uiLayer = document.getElementById('ui');
    const scannerLayer = document.getElementById('scanner-container');
    const sceneEl = document.querySelector('a-scene');
    const targetEntity = document.getElementById('target');
    const arVideo = document.getElementById('ar-video');

    // Helper to get video path
    const getVideoPath = (idx) => `assets/video${idx}.mp4`;

    startBtn.addEventListener('click', () => {
        // Hide the landing screen
        uiLayer.style.display = 'none';
        // Show the corner brackets
        scannerLayer.style.display = 'flex';
        // Wake up the AR Camera
        sceneEl.systems['mindar-image-system'].start();
    });

    // When a target image is detected
    targetEntity.addEventListener("targetFound", () => {
        const index = targetEntity.getAttribute('mindar-image-target').targetIndex;
        scannerLayer.style.display = 'none'; // Hide corners so video is clear
        arVideo.setAttribute('src', getVideoPath(index));
        arVideo.load();
        arVideo.play();
    });

    // When the phone moves away from the image
    targetEntity.addEventListener("targetLost", () => {
        scannerLayer.style.display = 'flex'; // Show corners again to help user
        arVideo.pause();
    });
});
