document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const matrix = document.getElementById("matrix");
    if (!canvas || !matrix) return;

    const ctx = canvas.getContext("2d");
    canvas.width = 60;
    canvas.height = 30;

    const imageUrls = [
      "https://raw.githubusercontent.com/HevalNergiz/html-dot-matrix/main/Frame-5.jpg",
      "https://raw.githubusercontent.com/HevalNergiz/html-dot-matrix/main/Frame-6.jpg",
      "https://raw.githubusercontent.com/HevalNergiz/html-dot-matrix/main/Frame-7.jpg",
      "https://raw.githubusercontent.com/HevalNergiz/html-dot-matrix/main/Frame-8.jpg"
    ];

    let currentImageIndex = 0;

    function updateImage() {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = function () {
        ctx.drawImage(img, 0, 0, 60, 30);
        const imageData = ctx.getImageData(0, 0, 60, 30);
        const data = imageData.data;
        const matris = [];
        for (let i = 0; i < data.length; i += 4) {
          const grey = (data[i] + data[i + 1] + data[i + 2]) / 3;
          const row = Math.floor(i / 4 / 60);
          if (!matris[row]) {
            matris[row] = [];
          }
          matris[row].push(grey < 128 ? 1 : 0);
        }

        createSymbol(matris);
      };

      img.src = imageUrls[currentImageIndex];
      currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
    }

    setInterval(updateImage, 800);

    for (let i = 0; i < 1800; i++) {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      matrix.appendChild(dot);
    }

    function createSymbol(matris) {
      for (let row = 0; row < matris.length; row++) {
        for (let col = 0; col < matris[row].length; col++) {
          const dotIndex = row * 60 + col;
          const dot = document.querySelectorAll("#matrix .dot")[dotIndex];

          if(dot) {
              if (matris[row][col] === 1) {
                dot.classList.add("active");
              } else {
                dot.classList.remove("active");
              }
          }
        }
      }
    }

    let matris = [];
    createSymbol(matris);
});
