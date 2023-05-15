export interface ObjectWithCustomProperties {
    [key : string] : any
}

export enum ALLOWED_DATA_TYPES {
    STRING_VALUE = 0,
    STRING_ARRAY = 1,
    NUMBER_VALUE = 2,
    NUMBER_ARRAY = 3,
    BOOLEAN_VALUE = 4,
    BOOLEAN_ARRAY = 5,
    ANY_VALUE = 6,
    ANY_ARRAY = 7,
    OBJECT = 8
}