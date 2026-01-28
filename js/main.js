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
    // 1. Completely hide the landing UI container
    uiLayer.style.display = 'none';

    // 2. Locate and REMOVE the background video immediately
    const bgVideo = document.getElementById('bg-video');
    if (bgVideo) {
        bgVideo.pause();
        bgVideo.src = ""; 
        bgVideo.load();
        bgVideo.remove(); // This deletes the video from the DOM entirely
    }

    // 3. Make the background of the entire page transparent
    document.body.style.backgroundColor = "transparent";
    sceneEl.style.backgroundColor = "transparent";

    // 4. Show the scanner and buttons
    scannerLayer.style.display = 'flex';
    iconLayer.style.display = 'flex';

    // 5. Start the AR engine
    if (sceneEl.systems['mindar-image-system']) {
        sceneEl.systems['mindar-image-system'].start();
    }
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
