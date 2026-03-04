// Element references
const nextButton = document.getElementById('nextButton');
const imageInput = document.getElementById('images');
const maskInput = document.getElementById('masks');
const overlay = document.getElementById('overlay');
const ctx = overlay.getContext('2d');
const display = document.getElementById('display');

// State
let imageList = [];
let maskList = [];
let currentIndex = 0;

// When the image finishes loading, resize canvas to match and draw the mask
display.onload = function() {
  overlay.width = display.width;
  overlay.height = display.height;
  drawMask();
};

// Draws the current mask onto the canvas
function drawMask() {
  // Wipe the canvas clean
  ctx.clearRect(0, 0, overlay.width, overlay.height);

  // If no masks loaded, nothing to draw
  if (maskList.length === 0) return;

  // Create a temporary image to load the mask PNG
  const maskImg = new Image();
  maskImg.src = maskList[currentIndex];

  // Once the mask image loads, draw it on the canvas with transparency
  maskImg.onload = function() {
    ctx.globalAlpha = 0.3;
    ctx.drawImage(maskImg, 0, 0, overlay.width, overlay.height);
    ctx.globalAlpha = 1.0;
  };
}

// Listens for when the user picks image files
imageInput.addEventListener('change', function(event) {
  imageList = [];

  // Loop through each image and store a URL for it
  for (let i = 0; i < event.target.files.length; i++) {
    const url = URL.createObjectURL(event.target.files[i]);
    imageList.push(url);
  }

  // Show the first image
  currentIndex = 0;
  display.src = imageList[currentIndex];
});

// Listens for when the user picks mask files
maskInput.addEventListener('change', function(event) {
  maskList = [];

  // Loop through each mask and store a URL for it
  for (let i = 0; i < event.target.files.length; i++) {
    const url = URL.createObjectURL(event.target.files[i]);
    maskList.push(url);
  }

  // Draw the mask for the current image
  drawMask();
});

// Next button cycles to the next image (and its mask)
nextButton.addEventListener('click', function() {
  if (imageList.length === 0) return;

  currentIndex++;

  if (currentIndex >= imageList.length) {
    currentIndex = 0;
  }

  // Setting display.src triggers display.onload,
  // which automatically calls drawMask()
  display.src = imageList[currentIndex];
});