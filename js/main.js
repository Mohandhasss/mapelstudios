document.addEventListener("DOMContentLoaded", () => {

  const startBtn = document.getElementById("start-btn");
  const ui = document.getElementById("ui");
  const hud = document.getElementById("hud-container");
  const iconLayer = document.getElementById("client-icon-layer");
  const scannerVideo = document.getElementById("scanner-video");
  const sceneEl = document.querySelector("a-scene");

  startBtn.addEventListener("click", () => {

    // UI changes (this part IS working already)
    ui.style.display = "none";
    hud.style.display = "flex";
    iconLayer.style.display = "flex";

    // 🔴 THIS IS THE IMPORTANT PART
    // Start MindAR ONLY after scene is ready
    if (sceneEl.systems && sceneEl.systems["mindar-image-system"]) {
      sceneEl.systems["mindar-image-system"].start();
    }

    // Play scanner animation
    if (scannerVideo) {
      scannerVideo.currentTime = 0;
      scannerVideo.play();
    }

  });

});


