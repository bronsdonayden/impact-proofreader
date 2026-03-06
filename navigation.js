// Listens for when the user picks image files and pushes onto the global imageList 
//array
imageInput.addEventListener('change', function(event) {

  for (let i = 0; i < event.target.files.length; i++) {
    const url = URL.createObjectURL(event.target.files[i]);
    imageList.push(url);
  }

  currentIndex = 0;
  display.src = imageList[currentIndex];
  document.getElementById('imageCounter').textContent = `${currentIndex + 1} / ${imageList.length}`;
});

// Listens for when the user picks mask files and pushes them onto the global maskList 
//array
maskInput.addEventListener('change', function(event) {
  
  workingMasks = new Array(event.target.files.length);
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
  document.getElementById('imageCounter').textContent = `${currentIndex + 1} / ${imageList.length}`;

  if (currentIndex >= imageList.length) {
    currentIndex = 0;
  }

  display.src = imageList[currentIndex];
});

prevButton.addEventListener('click', function(){

  if(imageList.length === 0) return;

  currentIndex--;
  document.getElementById('imageCounter').textContent = `${currentIndex + 1} / ${imageList.length}`;

  if(currentIndex <= 0 ){
    currentIndex = 0;
  }
  display.src = imageList[currentIndex];
});