// Listens for when the user picks image files
imageInput.addEventListener('change', function(event) {
  imageList = [];

  for (let i = 0; i < event.target.files.length; i++) {
    const url = URL.createObjectURL(event.target.files[i]);
    imageList.push(url);
  }

  currentIndex = 0;
  display.src = imageList[currentIndex];
});

// Listens for when the user picks mask files
maskInput.addEventListener('change', function(event) {
  maskList = [];

  for (let i = 0; i < event.target.files.length; i++) {
    const url = URL.createObjectURL(event.target.files[i]);
    maskList.push(url);
  }

  updateOverlay();
});

// Next button cycles to the next image and mask
nextButton.addEventListener('click', function() {
  if (imageList.length === 0) return;

  currentIndex++;

  if (currentIndex >= imageList.length) {
    currentIndex = 0;
  }

  display.src = imageList[currentIndex];
});