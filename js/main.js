document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const uiLayer = document.getElementById('ui');
    const scannerLayer = document.getElementById('scanner-container');
    const iconLayer = document.getElementById('icon-layer');
    const sceneEl = document.querySelector('a-scene');
    const targetEntity = document.getElementById('target');
    const arVideo = document.getElementById('ar-video');

    const getVideoPath = (idx) => `assets/video${idx}.mp4`;

    // Internal function to start AR
    const startAR = () => {
    const arSystem = sceneEl.systems['mindar-image-system'];
    if (arSystem) {
        arSystem.start(); 
        
        // First resize immediately
        window.dispatchEvent(new Event('resize'));
        
        // Second resize after 500ms once the UI is fully hidden
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
            console.log("Forcing second resize to fix 75% crop");
        }, 500);
    }
};

    startBtn.addEventListener('click', () => {
        uiLayer.style.display = 'none';
        
        const bgVideo = document.getElementById('bg-video');
        if (bgVideo) {
            bgVideo.pause();
            bgVideo.style.display = 'none';
        }

        scannerLayer.style.display = 'flex';
        iconLayer.style.display = 'flex';

        if (sceneEl.hasLoaded) {
            startAR();
        } else {
            sceneEl.addEventListener('loaded', startAR);
        }
    });

    // FIXED: Changed etEntity to targetEntity
    targetEntity.addEventListener("targetFound", () => {
    scannerLayer.style.display = 'none';
    
    // Hide video, show 3D model
    document.getElementById('video-display').setAttribute('visible', false);
    document.getElementById('model-display').setAttribute('visible', true);
});
    targetEntity.addEventListener("targetLost", () => {
    scannerLayer.style.display = 'flex';
    document.getElementById('model-display').setAttribute('visible', false);
});
