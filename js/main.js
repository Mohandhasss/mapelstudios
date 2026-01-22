/* Mapel Studios AR Engine Logic */
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.querySelector('#start-btn');
    const video = document.querySelector('#ar-video');
    const sceneEl = document.querySelector('a-scene');
    const ui = document.querySelector('#ui');
    const target = document.querySelector('#target');

    startBtn.addEventListener('click', () => {
        ui.style.opacity = '0';
        setTimeout(() => { ui.style.display = 'none'; }, 500);
        
        // Start AR Engine
        sceneEl.systems['mindar-image-system'].start();
        
        // Big Company Fix: Ensures video plays on interaction
        video.play().catch(() => {
            video.muted = true;
            video.play();
        });
    });

    // Pause video when user moves phone away to save battery/data
    target.addEventListener("targetFound", () => { video.play(); });
    target.addEventListener("targetLost", () => { video.pause(); });
});
