contrastSlider.addEventListener('input', () => {
    img.style.filter = `contrast(${contrastSlider.value}%)`;
  });
  
  opacitySlider.addEventListener('input', () => {
    img.style.opacity = opacitySlider.value / 255;
  });
  
  zoomSlider.addEventListener('input', () => {
    const scale = zoomSlider.value;
    img.style.transform = `scale(${scale})`;
  });