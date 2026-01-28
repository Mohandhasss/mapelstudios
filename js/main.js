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
    // 1. Hide the landing UI completely
    const uiLayer = document.getElementById('ui');
    uiLayer.style.setProperty('display', 'none', 'important');

    // 2. Kill the background video
    const bgVideo = document.getElementById('bg-video');
    if (bgVideo) {
        bgVideo.pause();
        bgVideo.remove(); 
    }

    // 3. Force scanner and buttons to show
    document.getElementById('scanner-container').style.setProperty('display', 'flex', 'important');
    document.getElementById('icon-layer').style.setProperty('display', 'flex', 'important');

    // 4. Force transparency on the body
    document.body.style.setProperty('background-color', 'transparent', 'important');

    // 5. Start Mind-AR
    sceneEl.systems['mindar-image-system'].start();
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
