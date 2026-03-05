const contrastSlider = document.getElementById('contrastSlider');
const ImageOpacitySlider = document.getElementById('ImageOpacitySlider');
const OverlayOpacitySlider = document.getElementById('OverlayOpacitySlider');
const zoomSlider = document.getElementById('zoomSlider');

contrastSlider.addEventListener('input', () => {
    display.style.filter = `contrast(${contrastSlider.value}%)`;
  });
  
  ImageOpacitySlider.addEventListener('input', () => {
    display.style.opacity = ImageOpacitySlider.value / 255;
  });

  OverlayOpacitySlider.addEventListener('input', () => {
    overlay.style.opacity = OverlayOpacitySlider.value/255;
  })
  
  zoomSlider.addEventListener('input', () => {
    const scale = zoomSlider.value;
    display.style.transform = `scale(${scale})`;
    overlay.style.transform = `scale(${scale})`;
  });