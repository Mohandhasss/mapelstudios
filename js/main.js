document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const ui = document.getElementById('ui');
    const scanner = document.getElementById('scanner-container');
    const icons = document.getElementById('icon-layer');
    const sceneEl = document.querySelector('a-scene');
    const targetEntity = document.getElementById('target');
    const arVideo = document.getElementById('ar-video');

    // Matches target index to file: video0.mp4, video1.mp4, etc.
    const getVideoUrl = (index) => `assets/video${index}.mp4`;

    startBtn.addEventListener('click', () => {
        ui.style.display = 'none';
        scanner.style.display = 'flex';
        icons.style.display = 'flex';
        sceneEl.systems['mindar-image-system'].start();
    });

    targetEntity.addEventListener("targetFound", (event) => {
        // Find which target was scanned
        const currentTarget = targetEntity.getAttribute('mindar-image-target').targetIndex;
        console.log("Found Target: " + currentTarget);

        // Hide scanner and load the specific video file
        scanner.style.display = 'none';
        arVideo.setAttribute('src', getVideoUrl(currentTarget));
        arVideo.load();
        
        // Use a promise to ensure video plays correctly on mobile
        const playPromise = arVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => console.log("Auto-play blocked"));
        }
    });

    targetEntity.addEventListener("targetLost", () => {
        console.log("Target Lost");
        scanner.style.display = 'flex';
        arVideo.pause();
    });
});
