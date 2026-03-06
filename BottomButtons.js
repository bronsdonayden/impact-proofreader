  // Wait until page loads Comfrim and next image button (it works but you have 
  //to upload new image and mask to see pervious image will be underneath the 
  //new mask and image you upload )
document.addEventListener("DOMContentLoaded", () => {

  // Elements
  const display = document.getElementById("display");
  const overlay = document.getElementById("overlay");
  const nextButton = document.getElementById("nextButton");
  const imageInput = document.getElementById("images");

  const ctx = overlay.getContext("2d");

  // Image storage
  let images = [];
  let currentIndex = 0;
  let overlays = [];

  // Load images from file input
  imageInput.addEventListener("change", (e) => {

    // Store new images
    images = Array.from(e.target.files);
    currentIndex = 0;

    // --- Option 1: clear overlay when loading new images ---
    ctx.clearRect(0, 0, overlay.width, overlay.height);

    if (images.length > 0) {
      display.src = URL.createObjectURL(images[currentIndex]);
    }

  });

  // Resize overlay when image loads
  display.addEventListener("load", () => {

    const width = display.clientWidth;
    const height = display.clientHeight;

    // actual canvas resolution
    overlay.width = width;
    overlay.height = height;

    // visual size
    overlay.style.width = width + "px";
    overlay.style.height = height + "px";

    // Optional: clear canvas again when image loads to avoid any leftover drawings
    ctx.clearRect(0, 0, overlay.width, overlay.height);
    ctx.fillStyle = "transparent";
    ctx.fillRect(0, 0, overlay.width, overlay.height)

  });

  // Confirm and show next image
  nextButton.addEventListener("click", () => {

    if (images.length === 0) {
      console.log("No images loaded");
      return;
    }

    // clear overlay drawing
    ctx.clearRect(0, 0, overlay.width, overlay.height);

    // go to next image
    currentIndex++;

    if (currentIndex >= images.length) {
      currentIndex = 0;
    }

    display.src = URL.createObjectURL(images[currentIndex]);

  });
});