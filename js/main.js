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
        hud.style.display = 'block';
        
        // Start AR Engine and Overlay Video
        sceneEl.systems['mindar-image-system'].start();
        scannerVideo.play().catch(e => console.warn("Scanner Play Error:", e));
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
