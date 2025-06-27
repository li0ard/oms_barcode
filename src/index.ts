import { calculateLuhn, decodeDate, findFioBlockEnd, OMSCodec } from "./utils";
import { PolicyTypes, type ParsedPolicy } from "./types";

export * from "./types"
export * from "./utils"

/**
 * Получить информацию с штрихкода полиса ОМС
 * @param data Содержимое штрихкода PDF417
 * @returns {ParsedPolicy}
 */
export const parse = (data: Uint8Array): ParsedPolicy => {
    if(data.length !== 130) throw new Error("Incorrect length. Must be 130 bytes")
    if(!PolicyTypes[data[0]]) throw new Error("Unsupported type");
    let number = 0n
    for (const i of data.subarray(1, 9)) {
        number = (number << 8n) | BigInt(i)
    }

    let ogrn = 0n
    for (const i of data.subarray(56, 62)) {
        ogrn = (ogrn << 8n) | BigInt(i)
    }

    let okato = data.subarray(62, 65)

    let fioBlockEnd = findFioBlockEnd(9, data)
    let fioBlock = []
    if(data[0] == 1) {
        fioBlock = OMSCodec.decode(data.subarray(9, 42).reverse()).trim().split("|").map(i => i.split("").reverse().join(""))
    } else {
        fioBlock = OMSCodec.decode(data.subarray(9, fioBlockEnd-8)).trim().split("|")
    }

    return {
        type: data[0],
        number: number.toString(),
        last: (data[0] == 1) ? fioBlock[1] : fioBlock[0],
        first: (data[0] == 1) ? fioBlock[2] : fioBlock[1],
        middle: (data[0] == 1) ? fioBlock[0] : fioBlock[2],
        dob: (data[0] == 1) ? decodeDate(data.subarray(52, 54)) : decodeDate(data.subarray(fioBlockEnd+2, fioBlockEnd+4)),
        exp: (data[0] == 1) ? decodeDate(data.subarray(54, 56)) : decodeDate(data.subarray(fioBlockEnd+4, fioBlockEnd+6)),
        gender: (data[0] == 1) ? data[51] : data[(fioBlockEnd+1)],
        signature: data.subarray(65),

        ogrn: (data[0] == 1) ? ogrn.toString() : null,
        okato: (data[0] == 1) ? ((okato[0] << 16) | (okato[1] << 8) | okato[2]).toString() : null,
        
        checksumValid: calculateLuhn(number.toString().slice(0,15)) == number.toString().slice(15)
    }
}