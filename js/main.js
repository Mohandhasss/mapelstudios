document.addEventListener('DOMContentLoaded', () => {
    // 1. Select all necessary elements
    const startBtn = document.getElementById('start-btn');
    const ui = document.getElementById('ui');
    const hud = document.getElementById('hud-container');
    const iconLayer = document.getElementById('icon-layer');
    const scannerVideo = document.getElementById('scanner-video');
    const arVideo = document.getElementById('ar-video');
    const sceneEl = document.querySelector('a-scene');
    const targetEntity = document.getElementById('target');

    // 2. Logic for the "ACTIVATE AR" button
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            // Hide the initial landing UI
            ui.style.display = 'none';
            
            // Show the scanner and the two corner buttons
            hud.style.display = 'block';
            iconLayer.style.display = 'flex';

            // Initialize and start the AR engine
            if (sceneEl.systems['mindar-image-system']) {
                sceneEl.systems['mindar-image-system'].start();
            }
            
            // Play the scanner video with a re-render hack to fix "faded" background
            scannerVideo.play().then(() => {
                // Temporary toggle to force the browser to apply CSS 'screen' blend mode properly
                scannerVideo.style.display = 'none';
                scannerVideo.offsetHeight; // Force reflow
                scannerVideo.style.display = 'block';
            }).catch(err => {
                console.error("Video playback failed:", err);
            });
        });
    }

    // 3. Logic for when an image target is found
    if (targetEntity) {
        targetEntity.addEventListener("targetFound", () => {
            console.log("Target Found");
            // Hide the scanner once the AR content appears
            hud.style.display = 'none';
            // Play the AR video/content
            if (arVideo) {
                arVideo.play();
            }
        });

        // 4. Logic for when the image target is lost
        targetEntity.addEventListener("targetLost", () => {
            console.log("Target Lost");
            // Bring back the scanner to guide the user
            hud.style.display = 'block';
            // Pause the AR video/content
            if (arVideo) {
                arVideo.pause();
            }
        });
    }
});
