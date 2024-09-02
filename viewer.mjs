import { getData } from "./hexParser.mjs";

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
    canvas.width = imageData.Width.data;
    canvas.height = imageData.Height.data;
    
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "blue";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

