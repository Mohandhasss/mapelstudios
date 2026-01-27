// 1. SELECT ALL NECESSARY ELEMENTS
const startBtn = document.getElementById('start-btn');
const uiLayer = document.getElementById('ui');
const iconLayer = document.getElementById('icon-layer');
const scannerContainer = document.getElementById('scanner-container');
const sceneEl = document.querySelector('a-scene');
const arVideo = document.querySelector('#ar-video');

// Tutorial Card Elements
const infoBtn = document.getElementById('info-btn');
const tutorialCard = document.querySelector('.card');

// 2. START AR SEQUENCE
if (startBtn) {
    startBtn.addEventListener('click', () => {
        // Hide Landing UI
        uiLayer.style.display = 'none';
        
        // Show AR Controls and Scanner Overlay
        iconLayer.style.display = 'flex';
        scannerContainer.style.display = 'block';
        
        // Start Mind-AR Scene
        sceneEl.systems['mindar-image-system'].start();
        console.log("AR Scene Started");
    });
}

// 3. TUTORIAL CARD LOGIC
if (infoBtn && tutorialCard) {
    // Open the Maroon tutorial box when "i" is clicked
    infoBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevents clicking through to the AR scene
        tutorialCard.style.setProperty('display', 'flex', 'important');
    });

    // Close the tutorial when the user clicks anywhere on the box
    tutorialCard.addEventListener('click', () => {
        tutorialCard.style.setProperty('display', 'none', 'important');
    });
}

// 4. AR TARGET DETECTION LOGIC
const targetEntity = document.querySelector('#target');

if (targetEntity) {
    // When the image target is found
    targetEntity.addEventListener("targetFound", event => {
        console.log("Target Found!");
        scannerContainer.style.display = 'none'; // Hide scanner lines
        arVideo.play(); // Start the AR video
    });

    // When the image target is lost
    targetEntity.addEventListener("targetLost", event => {
        console.log("Target Lost");
        scannerContainer.style.display = 'block'; // Show scanner lines again
        arVideo.pause(); // Pause video to save performance
    });
}
