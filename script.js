
//button Consts
const nextButton = document.getElementById('nextButton');
const imageInput = document.getElementById('images');
const maskInput = document.getElementById('masks');
const overlay = document.getElementById('overlay');
const ctx = overlay.getContext('2d');
const display = document.getElementById('display');



let imageList = [];
let maskList = [];
let currentIndex = 0;



//Listens for when the user picks files(Claude figured this one out)
imageInput.addEventListener('change', function(event) {

    imageList = [];

    //Loops through each image that the user inputs and puts it into the array.
  for (let i = 0; i < event.target.files.length; i++) {
    const url = URL.createObjectURL(event.target.files[i]); 
    imageList.push(url);
  }

  //sets the first image being displayed and displays it
  currentIndex = 0;
  display.src = imageList[currentIndex];

})

//Does same thing as above function, just with masks
maskInput.addEventListener('change', function(event) {

    maskList = [];

    //Loops through each mask that the user inputs and puts it into the array.
  for (let i = 0; i < event.target.files.length; i++) {
    const url = URL.createObjectURL(event.target.files[i]); 
    maskList.push(url);
  }

  //sets the first image being displayed and displays it
  currentIndex = 0;
  display.src = maskList[currentIndex];

})

//Records for click on the next image button and changes the image to the next one
nextButton.addEventListener('click', function(){

    if(imageList.length == 0){
        return; 
    }

    currentIndex++ //Moves to next image

    if (currentIndex >= imageList.length) {
    currentIndex = 0;
  }
  
  display.src = imageList[currentIndex]; 
})

//Does the same as previous, but for masks
maskInput.addEventListener('change', function(event) {

    maskList = [];

    for (let i = 0; i < event.target.files.length; i++) {
        const url = URL.createObjectURL(event.target.files[i]); 
        maskList.push(url);
    }

    currentIndex = 0;
    // TODO make it so masks go on the canvas tag in html
})