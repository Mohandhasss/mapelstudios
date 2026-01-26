document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const ui = document.getElementById('ui');
    const scanner = document.getElementById('scanner-container');
    const icons = document.getElementById('icon-layer');
    const sceneEl = document.querySelector('a-scene');
    const targetEntity = document.getElementById('target');
    const arVideo = document.getElementById('ar-video');

    const getVideoUrl = (index) => `assets/video${index}.mp4`;

    startBtn.addEventListener('click', () => {
        ui.style.display = 'none';
        scanner.style.display = 'flex';
        icons.style.display = 'flex';
        sceneEl.systems['mindar-image-system'].start();
    });

    targetEntity.addEventListener("targetFound", () => {
        const currentTarget = targetEntity.getAttribute('mindar-image-target').targetIndex;
        scanner.style.display = 'none'; // Hides the scanner when image is matched
        arVideo.setAttribute('src', getVideoUrl(currentTarget));
        arVideo.load();
        arVideo.play().catch(() => console.log("Auto-play blocked"));
    });

    targetEntity.addEventListener("targetLost", () => {
        scanner.style.display = 'flex'; // Shows scanner again if image is lost
        arVideo.pause();
    });
});
