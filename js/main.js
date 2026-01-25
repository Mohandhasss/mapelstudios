document.addEventListener('DOMContentLoaded', () => {

  const startBtn = document.getElementById('start-btn');
  const ui = document.getElementById('ui');
  const hud = document.getElementById('hud-container');
  const iconLayer = document.getElementById('client-icon-layer');
  const scannerVideo = document.getElementById('scanner-video');
  const sceneEl = document.querySelector('a-scene');

  // Wait until A-Frame scene is fully loaded
  sceneEl.addEventListener('loaded', () => {

    startBtn.addEventListener('click', async () => {

      // Hide start UI
      ui.style.display = 'none';

      // Show scanner overlay
      hud.style.display = 'flex';
      iconLayer.style.display = 'flex';

      // Start MindAR safely
      const mindarSystem = sceneEl.systems['mindar-image-system'];
      await mindarSystem.start();

      // Play scanner animation
      scannerVideo.currentTime = 0;
      scannerVideo.play();

    });

  });

});

