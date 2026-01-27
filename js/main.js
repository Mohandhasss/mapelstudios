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
        scannerLayer.style.display = 'flex';
        iconLayer.style.display = 'flex'; // Make buttons visible
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
   const settingsBtn = document.getElementById('btn-right');
const tutorialWrapper = document.getElementById('tutorial-popup');

if (settingsBtn && tutorialWrapper) {
    // Show the Uiverse card when clicking top-right
    settingsBtn.addEventListener('click', () => {
        tutorialWrapper.style.display = 'block';
    });

    // Hide it when clicking the card itself
    tutorialWrapper.addEventListener('click', () => {
        tutorialWrapper.style.display = 'none';
    });
}
});
