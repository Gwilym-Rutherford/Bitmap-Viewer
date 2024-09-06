import { BitmapStructure } from "./bitmapStructure.js";
import { getData, rasterDataToRgb, removePadding } from "./hexParser.js";

const inputtedImage = document.getElementById("imageInput");

let imageData;
let fileReader = new FileReader();
inputtedImage.addEventListener("change", (event)=>{
    let file = event.target.files[0];
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (event)=>{
        let arrayBuffer = event.target.result;
        let byteArray = new Uint8Array(arrayBuffer);
        let hexString = '';
        
        for (let byte of byteArray) {
            hexString += byte.toString(16).padStart(2, "0");
        }

        imageData = getData(hexString);
    }
});

fileReader.onloadend = ()=>{
    const canvas = document.getElementById("viewer");
    const ctx = canvas.getContext("2d");
    canvas.width = imageData.Width.data;
    canvas.height = imageData.Height.data;
    
    let pixelData = rasterDataToRgb(removePadding(BitmapStructure.RasterData));
    let rowOffset = canvas.height;
    pixelData.forEach((pixel, index) => {
        ctx.fillStyle = "#" + pixel;
        
        if((index % canvas.width) == 0){
            rowOffset--;
        }

        ctx.fillRect(index % canvas.width, rowOffset, 1, 1);
    });
    document.getElementById("hexData").innerText = imageData.RasterData;
}

