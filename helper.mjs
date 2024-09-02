export function convertToBigEndian(hex){
    if(hex != null){
        let splitUpIntoBytes = hex.match(/.{1,2}/g);
        let reversed = splitUpIntoBytes.reverse();
        return reversed.join("");
    }
    return hex;
}

export function getRasterData(rawHex, dataOffset, size){
    return rawHex.substring(dataOffset * 2, size * 2);
}