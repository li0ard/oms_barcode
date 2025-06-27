/** Пол */
export enum Genders {
    /** Мужской */
    MALE = 1,
    /** Женский */
    FEMALE = 2
}

/** Тип полиса ОМС */
export enum PolicyTypes {
    /** Полный (ОГРН + ОКАТО) */
    FULL = 1,
    /** Обычный */
    SHORT = 2
}

/** Обработанная информация с штрихкода */
export interface ParsedPolicy {
    /** Тип полиса */
    type: PolicyTypes
    /** Фамилия */
    last: string
    /** Имя */
    first: string
    /** Отчество */
    middle: string
    /** Дата рождения */
    dob: Date
    /** Срок годности (1900-01-01 по умолчанию) */
    exp: Date
    /** Пол */
    gender: Genders
    /** Единый номер полиса (ЕНП) */
    number: string
    /** ЭЦП полиса */
    signature: Uint8Array
    /** Код ОГРН СМО */
    ogrn: string | null
    /** Код ОКАТО региона заключения договора с СМО */
    okato: string | null
    /** Результат проверки контрольной суммы ЕНП */
    checksumValid: boolean
}