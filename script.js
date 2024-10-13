const imageContainer = document.getElementById("imageContainer");
const hiddenImage = document.getElementById("hiddenImage");
const cover = document.getElementById("cover");
const uncoverTileBtn = document.getElementById("uncoverTileBtn");
const uncoverAllBtn = document.getElementById("uncoverAllBtn");
const nextPhotoBtn = document.getElementById("nextPhotoBtn");
let revealedTiles = 0;
const gridSize = 5;
const maxReveals = 15;
const blurLevels = 10;
let tileElements = [];
let currentPhotoIndex = 0;


const photos = [
    "leonardo_dicaprio.jpg",
    "dinari.jpg",
    "kamel_touati.png",
    "bahri_rahali.jpg",
    "robert_de_nero.jpg",
  
];


function createTiles() {
  cover.innerHTML = ""; 
  cover.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  cover.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

  tileElements = []; // Reset tile elements
  for (let i = 0; i < gridSize * gridSize; i++) {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.addEventListener("click", revealRandomTile);
    cover.appendChild(tile);
    tileElements.push(tile); 
  }
}


function revealRandomTile() {
  if (revealedTiles < maxReveals) {
    const randomTile = tileElements[Math.floor(Math.random() * tileElements.length)];


    if (!randomTile.classList.contains("revealed")) {
      randomTile.classList.add("revealed");
      revealedTiles++;


      const blurValue = Math.max(0, blurLevels - revealedTiles);
      hiddenImage.style.filter = `blur(${blurValue}px)`;

      if (revealedTiles === maxReveals) {
        alert("Max reveals reached! Try guessing now.");
      }
    }
  }
}


uncoverTileBtn.addEventListener("click", () => {
  revealRandomTile();
});


uncoverAllBtn.addEventListener("click", () => {
  tileElements.forEach(tile => {
    tile.classList.add("revealed");
  });
  revealedTiles = gridSize * gridSize;
  hiddenImage.style.filter = "blur(0px)";
});


nextPhotoBtn.addEventListener("click", () => {
  currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
  loadImage();
  revealedTiles = 0;
  hiddenImage.style.filter = `blur(${blurLevels}px)`;
  createTiles();
});


function loadImage() {
  hiddenImage.src = photos[currentPhotoIndex];
}


function adjustCoverSize() {
  const rect = hiddenImage.getBoundingClientRect();
  cover.style.width = `${rect.width}px`;
  cover.style.height = `${rect.height}px`;
}


hiddenImage.onload = function () {
  adjustCoverSize();
  createTiles();
};


window.addEventListener("load", loadImage);


window.addEventListener("resize", adjustCoverSize);
