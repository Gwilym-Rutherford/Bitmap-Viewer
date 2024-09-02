import { BitmapStructure } from "./BitmapStructure.mjs";
import { convertToBigEndian, getRasterData } from "./helper.mjs";

export function getData(rawHexData){
    let keys = Object.keys(BitmapStructure);
    keys.forEach((attribute)=>{
        let offset = BitmapStructure[attribute].offset * 2;
        let size = BitmapStructure[attribute].size * 2;
        let dataLittleEndian = rawHexData.substring(offset, offset + size);
        let dataBigEndian = ("0x" + convertToBigEndian(dataLittleEndian));

        BitmapStructure[attribute].data = dataBigEndian;
        console.log(attribute + ": " + BitmapStructure[attribute].data);
    });
    
    BitmapStructure["RasterData"] = getRasterData(rawHexData, BitmapStructure.DataOffset.data, BitmapStructure.ImageSize.data);
    console.log("RasterData: " + BitmapStructure.RasterData);

    return BitmapStructure
}