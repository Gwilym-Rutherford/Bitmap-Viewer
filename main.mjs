import fs from "fs";
import { BitmapStructure } from "./BitmapStructure.mjs";

fs.readFile("./blackbuck.bmp", "hex", (err, data)=>{
    if(err){
        console.log("there seems to be an error with your file");
        process.exit(1);
    }
    
    let rawHexData = data;

    //const formattedHexData = new Map();
    let keys = Object.keys(BitmapStructure);
    keys.forEach((attribute)=>{
        let offset = BitmapStructure[attribute].offset * 2;
        let size = BitmapStructure[attribute].size * 2;
        let dataLittleEndian = rawHexData.substring(offset, offset + size);
        let dataBigEndian = ("0x" + convertToBigEndian(dataLittleEndian));

        BitmapStructure[attribute].data = dataBigEndian;
        console.log(attribute + ": " + BitmapStructure[attribute].data);
    });

    console.log("RasterData: " + getRasterData(rawHexData, BitmapStructure.DataOffset.data, BitmapStructure.ImageSize.data));

})

function convertToBigEndian(hex){
    if(hex != null){
        let splitUpIntoBytes = hex.match(/.{1,2}/g);
        let reversed = splitUpIntoBytes.reverse();
        return reversed.join("");
    }
    return hex;
}


function getRasterData(rawHex, dataOffset, size){
    return rawHex.substring(dataOffset * 2, size * 2);
}

