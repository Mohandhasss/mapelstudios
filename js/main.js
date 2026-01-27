/**
 * AXIS OF WONDERS - FULL SITE LOGIC
 * Includes: Landing Page, AR Scene Control, and Tutorial Popup
 */

// 1. SELECT ALL UI ELEMENTS
const startBtn = document.getElementById('start-btn');
const infoBtn = document.getElementById('info-btn');
const uiLayer = document.getElementById('ui'); // Landing page wrapper
const iconLayer = document.getElementById('icon-layer'); // AR UI buttons
const scannerContainer = document.getElementById('scanner-container');
const tutorialCard = document.querySelector('.card');
const sceneEl = document.querySelector('a-scene');
const arVideo = document.querySelector('#ar-video');

// 2. EXPERIENCE AR START SEQUENCE
if (startBtn) {
    startBtn.addEventListener('click', () => {
        // Hide the landing video and main logo
        uiLayer.style.display = 'none';
        
        // Show the AR scanning interface and control buttons
        iconLayer.style.display = 'flex';
        scannerContainer.style.display = 'block';
        
        // Start the Mind-AR engine manually
        if (sceneEl.systems['mindar-image-system']) {
            sceneEl.systems['mindar-image-system'].start();
            console.log("AR Engine Started");
        }
    });
}

// 3. TUTORIAL POPUP TOGGLE
if (infoBtn && tutorialCard) {
    // Show the maroon card when clicking the 'i' button
    infoBtn.addEventListener('click', (e) => {
        // Prevent click from affecting the 3D scene background
        e.stopPropagation(); 
        tutorialCard.style.setProperty('display', 'flex', 'important');
    });

    // Hide the card when clicking anywhere on the popup
    tutorialCard.addEventListener('click', () => {
        tutorialCard.style.setProperty('display', 'none', 'important');
    });
}

// 4. AR TARGET DETECTION LOGIC
const targetEntity = document.querySelector('#target');

if (targetEntity) {
    // Logic for when the camera recognizes the image target
    targetEntity.addEventListener("targetFound", event => {
        console.log("Target Found!");
        // Hide scanning corners so the AR content is clear
        scannerContainer.style.display = 'none'; 
        
        // Play the AR-photo video
        if (arVideo) {
            arVideo.play();
        }
    });

    // Logic for when the target moves out of camera view
    targetEntity.addEventListener("targetLost", event => {
        console.log("Target Lost");
        // Show scanning corners again to help the user
        scannerContainer.style.display = 'block'; 
        
        // Pause video to save device battery/performance
        if (arVideo) {
            arVideo.pause();
        }
    });
}

// 5. GLOBAL ERROR HANDLING (Optional for stability)
sceneEl.addEventListener("arError", (event) => {
    console.error("AR Error: ", event);
});
