  // Wait until page loads Comfrim and next image button (it works but you have 
  //to upload new image and mask to see {pervious image and mask be stored in a array }
  //new mask and image you upload )

  document.addEventListener("DOMContentLoaded", () => {

    // --- Elements ---
    const display = document.getElementById("display");
    const overlay = document.getElementById("overlay");
    const nextButton = document.getElementById("nextButton");
    const prevButton = document.getElementById("prevButton"); // optional
    const paintButton = document.getElementById("paintButton");
    const eraseButton = document.getElementById("eraseButton");
    const imageInput = document.getElementById("images");
  
    const ctx = overlay.getContext("2d");
  
    // --- Variables ---
    let images = [];
    let currentIndex = 0;
    let overlays = []; // store masks as data URLs
    let tool = "paint"; // default tool
    let isDrawing = false;
  
    // --- Upload images ---
    imageInput.addEventListener("change", (e) => {
      images = Array.from(e.target.files);
      currentIndex = 0;
      overlays = []; // reset masks for new batch
  
      if (images.length > 0) {
        display.src = URL.createObjectURL(images[currentIndex]);
      }
    });
  
    // --- Resize overlay when image loads ---
    display.addEventListener("load", () => {
      const width = display.clientWidth;
      const height = display.clientHeight;
  
      overlay.width = width;
      overlay.height = height;
      overlay.style.width = width + "px";
      overlay.style.height = height + "px";
  
      // Always start with a blank overlay for a fresh image
      ctx.clearRect(0, 0, overlay.width, overlay.height);
  
      // Restore saved overlay only if navigating (forward/back)
      if (overlays[currentIndex]) {
        const img = new Image();
        img.src = overlays[currentIndex];
        img.onload = () => ctx.drawImage(img, 0, 0, overlay.width, overlay.height);
      }
    });
  
    // --- Next / Previous Image ---
    function goToImage(index) {
      if (images.length === 0) return;
  
      // Save current overlay
      overlays[currentIndex] = overlay.toDataURL();
  
      // Update index
      currentIndex = index;
      if (currentIndex < 0) currentIndex = images.length - 1;
      if (currentIndex >= images.length) currentIndex = 0;
  
      // Load new image
      display.src = URL.createObjectURL(images[currentIndex]);
    }
  
    nextButton.addEventListener("click", () => goToImage(currentIndex + 1));
    prevButton?.addEventListener("click", () => goToImage(currentIndex - 1));
  
    // --- Tool buttons ---
    paintButton.addEventListener("click", () => tool = "paint");
    eraseButton.addEventListener("click", () => tool = "erase");
  
    // --- Drawing on overlay ---
    overlay.addEventListener("mousedown", () => isDrawing = true);
    overlay.addEventListener("mouseup", () => { isDrawing = false; ctx.beginPath(); });
    overlay.addEventListener("mouseleave", () => { isDrawing = false; ctx.beginPath(); });
  
    overlay.addEventListener("mousemove", (e) => {
      if (!isDrawing) return;
      const rect = overlay.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
  
      if (tool === "paint") {
        ctx.fillStyle = "red";
        ctx.fillRect(x - 2.5, y - 2.5, 5, 5);
      } else if (tool === "erase") {
        const eraseSize = 15;
        ctx.clearRect(x - eraseSize / 2, y - eraseSize / 2, eraseSize, eraseSize);
      }
    });
  
  });
 
    
 