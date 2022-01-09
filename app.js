const size = document.getElementById("sizeScale");
const sizeText = document.getElementById("size");
const parentGrid = document.querySelector(".main .grid");
const colorButton = document.getElementById("color");
const rainbowButton = document.getElementById("rainbow")
const colorPicker = document.getElementById("colorSelector");
const eraserButton = document.getElementById("eraser");
const clearButton = document.getElementById("clear");
const grids = document.getElementById("gridsquares");
const DEF_SIZE = 20;
let currentMode = "color";
let currentColor = colorPicker.value

//updates slider value to text value
let sizeUpdater = () => {
    const sizeRound = Math.round(document.getElementById("sizeScale").value);
    sizeText.textContent = `${sizeRound} x ${sizeRound}`;   
};

// updates text slider and creates desired grid size
size.addEventListener("input", () => {
    sizeUpdater();
    reloadGrids();
    createGrid(size.value); 
});

//creating grids
const createGrid =  (gridNumber) => { 
    let gridArea = gridNumber * gridNumber;
    parentGrid.style.gridTemplateColumns = `repeat(${gridNumber}, 1fr)`;
    parentGrid.style.gridTemplateRows = `repeat(${gridNumber}, 1fr)`;
    for (let i = 1; i <= gridArea; i++) {
        let gridItem = document.createElement('div');
        gridItem.addEventListener("mouseover",changeColor);
        gridItem.classList.add("grids")
        gridItem.setAttribute('id', 'gridsquares')
        parentGrid.appendChild(gridItem)
    } 
}

//color grids
const changeColor = (e) => {
    if (currentMode === "color") {
        e.target.style.backgroundColor = currentColor
        colorUpdater(colorPicker.value);
    } else if (currentMode === "eraser") {
        e.target.style.backgroundColor = "#ffffff"
    } else if (currentMode === "rainbow") {
        const randomR = Math.floor(Math.random() * 256)
        const randomG = Math.floor(Math.random() * 256)
        const randomB = Math.floor(Math.random() * 256)
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } 
}

const colorUpdater = (newColor) => {
     currentColor = newColor
}

//reload 
const reloadGrids = () => {
    parentGrid.innerHTML = "";
}

//button pressers
colorButton.onclick = () => {
    currentMode = "color";
    reloadGrids();
    createGrid(size.value);
    colorButton.classList.toggle("active");
    if (rainbowButton.getAttribute("class") == "active") {
        rainbowButton.classList.toggle("active");
    } else if (eraserButton.getAttribute("class") == "active") {
        eraserButton.classList.toggle("active")
    }
}

rainbowButton.onclick = () => {
    reloadGrids();
    createGrid(size.value);
    currentMode = "rainbow";
    rainbowButton.classList.toggle("active")
    if (colorButton.getAttribute("class") == "active") {
        colorButton.classList.toggle("active");
    } else if (eraserButton.getAttribute("class") == "active") {
        eraserButton.classList.toggle("active")
    }
}

eraserButton.onclick = () => {
    currentMode = "eraser";
    eraserButton.classList.toggle("active")
    if (colorButton.getAttribute("class") == "active") {
        colorButton.classList.toggle("active");
    } else if (rainbowButton.getAttribute("class") == "active") {
        rainbowButton.classList.toggle("active")
    }
}

clearButton.onclick = () => {
    reloadGrids();
    createGrid(size.value);
    sizeUpdater();
    clearButton.classList.toggle("active");
    setTimeout(() => {clearButton.classList.toggle("active");}, 130)
}  

//startup 
window.onload = () => {
    createGrid(DEF_SIZE);
    colorButton.classList.toggle("active");
}




