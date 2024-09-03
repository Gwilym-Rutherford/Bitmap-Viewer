export function convertToBigEndian(hex){
    let splitUpIntoBytes = hex.match(/.{1,2}/g);
    let reversed = splitUpIntoBytes.reverse();
    return reversed.join("");
    
}

export function getRasterData(rawHex, dataOffset){
    return rawHex.substring(dataOffset * 2);
}