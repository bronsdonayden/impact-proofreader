// Element references
const nextButton = document.getElementById('nextButton');
const imageInput = document.getElementById('images');
const maskInput = document.getElementById('masks');
const overlay = document.getElementById('overlay');
const ctx = overlay.getContext('2d', { willReadFrequently: true });
const display = document.getElementById('display');
const overlayMode = document.getElementById('overlayMode');

// State
let imageList = [];
let maskList = [];
let currentIndex = 0;

// When the image finishes loading, resize canvas to match and update overlay
display.onload = function() {
  overlay.width = display.width;
  overlay.height = display.height;
  updateOverlay();
};