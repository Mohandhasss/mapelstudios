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
    // 1. Hide the UI layer
    const uiLayer = document.getElementById('ui');
    uiLayer.style.setProperty('display', 'none', 'important');

    // 2. Remove the background video completely
    const bgVideo = document.getElementById('bg-video');
    if (bgVideo) {
        bgVideo.pause();
        bgVideo.remove(); 
    }

    // 3. FORCE the entire page to be see-through
    document.documentElement.style.background = "transparent";
    document.body.style.background = "transparent";
    
    // 4. Show AR UI
    document.getElementById('scanner-container').style.display = 'flex';
    document.getElementById('icon-layer').style.display = 'flex';

    // 5. Start the engine
    sceneEl.systems['mindar-image-system'].start();
        // Inside startBtn listener, after sceneEl.start()
setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
}, 500); // Wait half a second for the camera to load, then force a screen resize
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
