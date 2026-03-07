const paintButton = document.getElementById("paintButton");
const eraseButton = document.getElementById("eraseButton");
const brushSize = document.getElementById("brushSize");
const resetMaskButton = document.getElementById("resetMaskButton");

let paintToggle = false;
let eraseToggle = false;
let isDrawing = false;

overlay.addEventListener("mousedown", () => isDrawing = true);
overlay.addEventListener("mouseup", () => isDrawing = false);
overlay.addEventListener("mouseleave", () => isDrawing = false);

paintButton.addEventListener("click", () => {
  paintToggle = !paintToggle;
  eraseToggle = false;
});
eraseButton.addEventListener("click", () => {
  eraseToggle = !eraseToggle;
  paintToggle = false;
});

resetMaskButton.addEventListener("click", () => {
  const maskImg = new Image();
  maskImg.src = maskList[currentIndex];
  maskImg.onload = function() {
    ctx.drawImage(maskImg, 0, 0, overlay.width, overlay.height);
    const maskData = ctx.getImageData(0, 0, overlay.width, overlay.height);
    workingMasks[currentIndex] = buildMaskGrid(maskData.data);
    updateOverlay();
  };
});

overlay.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;
  if (!paintToggle && !eraseToggle) return;
  if (!workingMasks[currentIndex]) return;

  const rect = overlay.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const w = overlay.width;
  const size = Math.floor(brushSize.value / 2);

  if (paintToggle) { // Vibe coded the shit out of this. it works so i trust
    for (let dy = -size; dy <= size; dy++) {
      for (let dx = -size; dx <= size; dx++) {
        const px = Math.floor(x) + dx;
        const py = Math.floor(y) + dy;
        if (px >= 0 && px < w && py >= 0 && py < overlay.height) {
          workingMasks[currentIndex][py * w + px] = true;
        }
      }
    }
  } else if (eraseToggle) {
    for (let dy = -size; dy <= size; dy++) {
      for (let dx = -size; dx <= size; dx++) {
        const px = Math.floor(x) + dx;
        const py = Math.floor(y) + dy;
        if (px >= 0 && px < w && py >= 0 && py < overlay.height) {
          workingMasks[currentIndex][py * w + px] = false;
        }
      }
    }
  }

  updateOverlay();
});