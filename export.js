//// Vibe coded the shit out of this. Should continue to work as long as nothing changes a crazy amount

const exportButton = document.getElementById("exportButton");

exportButton.addEventListener("click", async () => {
  const zip = new JSZip();
  const imagesFolder = zip.folder("images");
  const masksFolder = zip.folder("masks");

  // Export images
  for (let i = 0; i < imageList.length; i++) {
    const response = await fetch(imageList[i]);
    const blob = await response.blob();
    imagesFolder.file(`image_${i}.png`, blob);
  }

  // Export masks
  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext("2d");
  tempCanvas.width = overlay.width;
  tempCanvas.height = overlay.height;

  for (let i = 0; i < maskList.length; i++) {
    if (workingMasks[i]) {
      // Edited mask — render from grid
      const grid = workingMasks[i];
      const imageData = tempCtx.createImageData(tempCanvas.width, tempCanvas.height);

      for (let j = 0; j < grid.length; j++) {
        const pixel = j * 4;
        if (grid[j]) {
          imageData.data[pixel] = 255;
          imageData.data[pixel + 1] = 255;
          imageData.data[pixel + 2] = 255;
          imageData.data[pixel + 3] = 255;
        } else {
          imageData.data[pixel] = 0;
          imageData.data[pixel + 1] = 0;
          imageData.data[pixel + 2] = 0;
          imageData.data[pixel + 3] = 255;
        }
      }

      tempCtx.putImageData(imageData, 0, 0);
      const blob = await new Promise(resolve => tempCanvas.toBlob(resolve, "image/png"));
      masksFolder.file(`mask_${i}.png`, blob);
    } else {
      // Unedited mask — export original file directly
      const response = await fetch(maskList[i]);
      const blob = await response.blob();
      masksFolder.file(`mask_${i}.png`, blob);
    }
  }

  // Download
  const content = await zip.generateAsync({ type: "blob" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(content);
  link.download = "export.zip";
  link.click();
});
