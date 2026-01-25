document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const ui = document.getElementById('ui');
    const hud = document.getElementById('hud-container');
    const iconLayer = document.getElementById('icon-layer');
    const scannerVideo = document.getElementById('scanner-video');
    const sceneEl = document.querySelector('a-scene');

    if (startBtn) {
        startBtn.addEventListener('click', () => {
            // Hide Start Page
            ui.style.display = 'none';
            
            // Show Scanner & Icons
            hud.style.display = 'block';
            iconLayer.style.display = 'flex';

            // Start AR Engine
            if (sceneEl.systems['mindar-image-system']) {
                sceneEl.systems['mindar-image-system'].start();
            }
            
            // Play scanner
            scannerVideo.play().catch(err => console.log("Video wait:", err));
        });
    }
});
