import { BitmapStructure } from "./bitmapStructure.js";
import { convertToBigEndian, getRasterData } from "./helper.js";

export function getData(rawHexData){
    let keys = Object.keys(BitmapStructure);
    console.log("rawHexData: " + rawHexData);
    keys.forEach((attribute)=>{
        if(attribute != "RasterData"){
            let offset = BitmapStructure[attribute].offset * 2;
            let size = BitmapStructure[attribute].size * 2;
            let dataLittleEndian = rawHexData.substring(offset, offset + size);
            let dataBigEndian = ("0x" + convertToBigEndian(dataLittleEndian));

            BitmapStructure[attribute].data = dataBigEndian;
            console.log(attribute + ": " + BitmapStructure[attribute].data);
        }
    });
    
    BitmapStructure["RasterData"] = getRasterData(rawHexData, BitmapStructure.DataOffset.data, BitmapStructure.ImageSize.data);
    console.log("RasterData: " + BitmapStructure.RasterData);

    return BitmapStructure
}

export function rasterDataToRgb(rasterData){
    let splitIntoColours = rasterData.match(/.{1,6}/g);
    splitIntoColours.forEach((pixel, index)=>{
        splitIntoColours[index] = convertToBigEndian(pixel);
    });
    return splitIntoColours;
}

export function removePadding(rawHex){
    let width = BitmapStructure.Width.data;
    let height = BitmapStructure.Height.data;
    let rowLength = findRowLength(width * 3) * 2;
    let dataWithoutPadding = ""

    for(let i = 0; i < height; i++){
        let offset = i*rowLength;
        dataWithoutPadding += rawHex.substring(offset, (offset + width * 6));
    }

    return dataWithoutPadding;
}

function findRowLength(rowLength){
    while((rowLength % 4) != 0){
        rowLength++;
    }
    return rowLength;
}

