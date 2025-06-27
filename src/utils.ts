import { parse } from "date-fns/parse";
import { addDays } from "date-fns/addDays";

const START_DATE = parse("1900-01-01", "yyyy-MM-dd", new Date())

/**
 * Декодирование даты
 * @param encodedDate Значение из штрихкода
 * @returns {Date}
 */
export const decodeDate = (encodedDate: Uint8Array): Date => {
    return addDays(START_DATE, (encodedDate[0] << 8) | encodedDate[1])
}

/**
 * Калькулятор контрольной суммы по алгоритму Луна для проверки ЕНП
 * @param str Номер полиса
 * @returns {string}
 */
export const calculateLuhn = (str: string): string => {
    return ((10-str.split('').reverse()
    .map((x) => parseInt(x))
    .reduce((chk,x,i) => (chk+(i%2?x:(x?(((x*2)%9)||9):0))),0)%10)%10).toString();
}

/**
 * Поиск конечного индекса блока ФИО для Типа 2
 * @param start Начальный индекс
 * @param data Данные с штрихкода
 * @returns {number}
 */
export const findFioBlockEnd = (start: number, data: Uint8Array): number => {
    let i = start
    while (i < (data.length - 2)) {
        if (data[i] + data[i + 1] == 0 && data[i + 2] < 3 && data[i + 2] > 0) {
            return i+1
        }
        i += 1
    }
    return -1
}

/** Символьная кодировка для ОМС */
export class OMSCodec {
    static charTable = [
        [' ', '.', '-', '‘', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'А', 'Б'],
        ['В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р'],
        ['С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ь', 'Ъ', 'Ы', 'Э', 'Ю', 'Я', '*'],
        ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '|']
    ]

    /**
     * Декодирование значения
     * @param encoded Закодированное значение
     * @returns {string}
     */
    static decode(encoded: Uint8Array): string {
        let accumulator = 0;
        let bitsCollected = 0;
        const sixBitGroups: number[] = [];

        for (const byte of encoded) {
            accumulator = (accumulator << 8) | byte;
            bitsCollected += 8;

            while (bitsCollected >= 6) {
                sixBitGroups.push((accumulator >> (bitsCollected - 6)) & 0x3F);
                bitsCollected -= 6;
                accumulator &= (1 << bitsCollected) - 1;
            }
        }

        if (bitsCollected > 0) {
            sixBitGroups.push((accumulator << (6 - bitsCollected)) & 0x3F);
        }

        let chars = []

        for(let i of sixBitGroups) {
            chars.push(this.charTable[(i / 16) | 0][i % 16])
        }

        return chars.join("");
    }
}