document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.querySelector('#start-btn');
    const mainVideo = document.querySelector('#ar-video');
    const scannerVideo = document.querySelector('#scanner-video');
    const hud = document.querySelector('#hud-container');
    const sceneEl = document.querySelector('a-scene');
    const ui = document.querySelector('#ui');
    const target = document.querySelector('#target');

    startBtn.addEventListener('click', () => {
        ui.style.display = 'none';
        
        // 1. Start the AR Engine first
        sceneEl.systems['mindar-image-system'].start();
        
        // 2. Try to show and play the scanner overlay
        hud.style.display = 'block';
        scannerVideo.play().catch(e => console.warn("Scanner video wait:", e));
    });

    target.addEventListener("targetFound", () => { 
        hud.style.display = 'none';
        scannerVideo.pause();
        mainVideo.play(); 
    });

    target.addEventListener("targetLost", () => { 
        mainVideo.pause(); 
        hud.style.display = 'block';
        scannerVideo.play().catch(() => {});
    });
});
