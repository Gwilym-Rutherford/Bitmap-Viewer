import fs from "fs";

fs.readFile("./checkers_test.bmp", "hex", (err, data)=>{
    if(err){
        console.log("there seems to be an error with your file");
    }
    
    let rawHexData = data;
    let formattedHexData = new Array(new Array(16))
    
    let numberOfRows = (rawHexData.length/2)/16;
    for(let i = 0; i < numberOfRows; i++){
        
        let rowData = getNRow(rawHexData, i);
        formattedHexData[i] = rowData.match(/.{1,2}/g);
    };
})

function getNRow(rawData, rowNumber){
    const ROW_OFFSET = 32
    let address = rowNumber * ROW_OFFSET;
    return rawData.substring(address, address + ROW_OFFSET); 
}
