import fs from "fs";
import { BitmapStructure } from "./BitmapStructure.mjs";

fs.readFile("./checkers_test.bmp", "hex", (err, data)=>{
    if(err){
        console.log("there seems to be an error with your file");
    }
    
    let rawHexData = data;

    console.log("!!!!!This is in little endian!!!!!")

    const formattedHexData = new Map();
    let keys = Object.keys(BitmapStructure);
    keys.forEach((attribute)=>{
        let offset = BitmapStructure[attribute].offset * 2;
        let size = BitmapStructure[attribute].size * 2;
        let data = rawHexData.substring(offset, offset + size);

        formattedHexData.set(attribute, data);
        console.log(attribute + ": " + data);
    });

    //console.log("Raster Data: " + rawHexData.substring(formattedHexData.get("DataOffset") * 2, rawHexData.length));
})

