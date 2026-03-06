  // Wait until page loads Comfrim and next image button (it works but you have 
  //to upload new image and mask to see {pervious image and mask be stored in a array }
  //new mask and image you upload )


  const paintButton = document.getElementById("paintButton");
  const eraseButton = document.getElementById("eraseButton");
  const brushSize = document.getElementById("brushSize");
  

  let paintToggle = false; 
  let eraseToggle = false;
  let isDrawing = false;

  overlay.addEventListener("mousedown", () => isDrawing = true);
  overlay.addEventListener("mouseup", () => { isDrawing = false; ctx.beginPath(); });
  overlay.addEventListener("mouseleave", () => { isDrawing = false; ctx.beginPath(); });
    
      // --- Tool buttons ---
  paintButton.addEventListener("click", () =>{
    paintToggle = !paintToggle;
    eraseToggle = false;
  });
  eraseButton.addEventListener("click", () =>{
    eraseToggle = !eraseToggle;
    paintToggle = false;
  });
  

  
    overlay.addEventListener("mousemove", (e) => {
      if (paintToggle == false && eraseToggle == false) return;
      const rect = overlay.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
  
      if (paintToggle && isDrawing) {
        ctx.fillStyle = "white";
        ctx.fillRect(x - 2.5, y - 2.5, 5, 5);
      } else if (eraseToggle && isDrawing) {
        
        ctx.clearRect(x - brushSize.value / 2, y - brushSize.value / 2, brushSize.value, brushSize.value);
      }
    });
  
 
    
 