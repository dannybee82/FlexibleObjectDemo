import { ObjectWithCustomProperties } from "./FlexibleObjectData";
import { ALLOWED_DATA_TYPES } from "./FlexibleObjectData";

/**
 * FlexibleObject - this class creates a single Flexible object.
 * 
 */

export class FlexibleObject {

    /*
     * Variables.
     * 
     * @see _flexibleObject = store the custom properties in this object.
     * 
     */

    private _flexibleObject: ObjectWithCustomProperties = {};

    /**
     * getFlexibleObject()
     * 
     */

    getFlexibleObject() : ObjectWithCustomProperties {
        return this._flexibleObject;
    }

    /**
     * setStringValue() - Adds a new property with a string value.
     * 
     */

    setStringValue(propertyName: string, value: string | null) : void {
        this._flexibleObject[propertyName] = (value === undefined) ? null : value;
    }

    /**
     * setStringArray() - Adds a new property with a string[] array.
     * 
     */

    setStringArray(propertyName: string, value: string[] | null) : void {
        this._flexibleObject[propertyName] = (value === undefined) ? null : value;
    }

     /**
     * setNumberValue() - Adds a new property with a number value.
     * 
     */

    setNumberValue(propertyName: string, value: number | null) : void {
        this._flexibleObject[propertyName] = (value === undefined) ? null : value;
    }

    /**
     * setNumberArray() - Adds a new property with a number[] array.
     * 
     */

    setNumberArray(propertyName: string, value: number[] | null) : void {
        this._flexibleObject[propertyName] = (value === undefined) ? null : value;
    }

    /**
     * setBooleanValue() - Adds a new property with a boolean value.
     * 
     */

    setBooleanValue(propertyName: string, value: boolean | null) : void {
        this._flexibleObject[propertyName] = (value === undefined) ? null : value;
    }

    /**
     * setBooleanArray() - Adds a new property with a boolean[] array.
     * 
     */

    setBooleanArray(propertyName: string, value: boolean[] | null) : void {
        this._flexibleObject[propertyName] = (value === undefined) ? null : value;
    }

    /**
     * setAnyValue() - Adds a new property of any value.
     * 
     */

    setAnyValue(propertyName: string, value: any | null) : void {
        this._flexibleObject[propertyName] = (value === undefined) ? null : value;
    }

    /**
     * setAnyArray() - Adds a new property of any[] array.
     * 
     */

    setAnyArray(propertyName: string, value: any[] | null) : void {
        this._flexibleObject[propertyName] = (value === undefined) ? null : value;
    }

    /**
     * setObject() - Method to add an object.
     * 
     */

    setObject(propertyName: string, value: object | null) : void {
        this._flexibleObject[propertyName] = (value === undefined) ? null : value;
    }

    /**
     * setValue() - Adds a new property with a specific value.
     * 
     */

    setValue(propertyName: string, value: any | null, type: ALLOWED_DATA_TYPES) : void {
        switch(type) {
            case ALLOWED_DATA_TYPES.STRING_VALUE:
                this.setStringValue(propertyName, value);
                break;
            case ALLOWED_DATA_TYPES.STRING_ARRAY:
                this.setStringArray(propertyName, value);
                break;  
            case ALLOWED_DATA_TYPES.NUMBER_VALUE:
                this.setNumberValue(propertyName, value);
                break;
            case ALLOWED_DATA_TYPES.NUMBER_ARRAY:
                this.setNumberArray(propertyName, value);
                break;
            case ALLOWED_DATA_TYPES.BOOLEAN_VALUE:
                this.setBooleanValue(propertyName, value);
                break;
            case ALLOWED_DATA_TYPES.BOOLEAN_ARRAY:
                this.setBooleanArray(propertyName, value);
                break;
            case ALLOWED_DATA_TYPES.ANY_VALUE:
                this.setAnyValue(propertyName, value);
                break;
            case ALLOWED_DATA_TYPES.ANY_ARRAY:
                this.setAnyArray(propertyName, value);
                break;
            case ALLOWED_DATA_TYPES.OBJECT:
                this.setObject(propertyName, value);
                break;
        }
    }

    /**
     * hasProperty() - Checks if property exists in Flexible Object.
     * 
     */

     hasProperty(propertyName: string) : boolean {
        let keys: string[] = Object.keys(this._flexibleObject) ?? [];
        return (keys.indexOf(propertyName) > -1) ? true : false;
    }

    /**
     * getType() - Method to get the property type (derived from it's value).
     * 
     * @param isVerbose = optional parameter. Can return: String, Number, Boolean, Object, Array String, Array Number, Array Boolean, Array Empty or Array Mixed.
     * 
     */

    getType(propertyName: string, isVerbose?: boolean) : string | undefined {
        if(!this.hasProperty(propertyName)) {
            return undefined;
        }

        let value: any = this._flexibleObject[propertyName]; 

        if(!isVerbose) {
            return Object.prototype.toString.call(value);
        }

        //Get verbose type-data.
        const regEx: RegExp = /^.*\s|\]{1}$/g;
        let type: string = Object.prototype.toString.call(value).replace(regEx, "");

        return (type === 'Array') ? type += this.getAdditionalData(value, regEx) : type;        
    }

    /**
     * isExpectedType() : Tests if the property is of the expected types.
     * 
     * @param types = Use: String, Number, Boolean, Object, Array String, Array Number, Array Boolean, Array Empty, Array Mixed, or Null
     * 
     */

    isExpectedType(propertyName: string, types: string[], lowerCase?: boolean) : boolean {
        let typeOfProperty: string | undefined = this.getType(propertyName, true);

        if(lowerCase) {
            typeOfProperty = typeOfProperty?.toLowerCase();
        }

        return (types.indexOf(typeOfProperty ?? '') > -1) ? true : false;
    }

    /**
     * removeProperty() - This method removes a property, when it exists.
     * 
     */

    removeProperty(propertyName: string) : void {
        if(this.hasProperty(propertyName)) {
            delete this._flexibleObject[propertyName];
        }
    }

    /**
     * clearAll() - This method clears all properties from the Flexible Object.
     * 
     */

    clearAll() : void {
        this._flexibleObject = {};
    }

    /**
     * getPropertyNames() - Method to get all the keys/property-names in this Flexible-object.
     * 
     */

    getPropertyNames() : string[] | undefined {
        let keys: string[] = Object.keys(this._flexibleObject) ?? [];
        return (keys.length > 0) ? keys : undefined;
    }

    /**
     * getPropertyAmount() = Method to get the amount of properties in this Flexible Object.
     * 
     */

    getPropertyAmount() : number {
        let propertyNames: string[] | undefined = this.getPropertyNames();
        return (propertyNames === undefined) ? 0 : propertyNames.length; 
    }

    /**
     * hasContents() - Method to check if the Flexible-object has any contents.
     * 
     */

    hasContents() : boolean {
        return (this.getPropertyNames() != undefined) ? true : false; 
    }

    /**
     * getStringValue() - Gets the string value of a property.
     * 
     */

    getStringValue(propertyName: string) : string | null {
        return (this.hasProperty(propertyName) && this.isExpectedType(propertyName, ["string", "null"], true)) ? this._flexibleObject[propertyName] : "";
    }

    /**
     * getStringArray() - Gets the string[] array of a property.
     * 
     */

    getStringArray(propertyName: string) : string[] | undefined | null {
        return (this.hasProperty(propertyName) && this.isExpectedType(propertyName, ["array string", "array empty", "null"], true)) ? this._flexibleObject[propertyName] : undefined;
    }

    /**
     * getNumberValue() - Gets the number value of a property.
     * 
     */

    getNumberValue(propertyName: string, defaultValue?: number) : number | null {
        return (this.hasProperty(propertyName) && this.isExpectedType(propertyName, ["number", "null"], true)) ? this._flexibleObject[propertyName] : defaultValue ?? 0;
    }

    /**
     * getNumberArray() - Gets the number[] array of a property.
     * 
     */

    getNumberArray(propertyName: string) : number[] | undefined | null {
        return (this.hasProperty(propertyName) && this.isExpectedType(propertyName, ["array number", "array empty", "null"], true)) ? this._flexibleObject[propertyName] : undefined;
    }

    /**
     * getBooleanValue() - Gets the boolean value of a property.
     * 
     */

    getBooleanValue(propertyName: string, defaultValue?: boolean) : boolean | null {
        return (this.hasProperty(propertyName) && this.isExpectedType(propertyName, ["boolean", "null"], true)) ? this._flexibleObject[propertyName] : defaultValue ?? false;
    }

    /**
     * getBooleanArray() - Gets the boolean[] array of a property.
     * 
     */

    getBooleanArray(propertyName: string) : boolean[] | undefined | null {
        return (this.hasProperty(propertyName) && this.isExpectedType(propertyName, ["array boolean", "array empty", "null"], true)) ?  this._flexibleObject[propertyName] : undefined;
    }

    /**
     * getAnyValue() - Gets the any value of a property.
     * 
     */

    getAnyValue(propertyName: string, defaultValue?: any) : any | null {
        return (this.hasProperty(propertyName)) ? this._flexibleObject[propertyName] : defaultValue ?? "";
    }

    /**
     * getAnyArray() - Gets the any[] array of a property.
     * 
     */

    getAnyArray(propertyName: string) : any[] | undefined | null {
        return (this.hasProperty(propertyName)) ? this._flexibleObject[propertyName] : undefined;
    }

    /**
     * getObject() - Gets the object of a property.
     * 
     */

    getObject(propertyName: string) : object | undefined | null {
        return (this.hasProperty(propertyName) && this.isExpectedType(propertyName, ["object", "null"], true)) ? this._flexibleObject[propertyName] : undefined;
    }

    /**
     * getValue() - Gets the value of a specified property of type.
     * 
     */

    getValue(propertyName: string, type: ALLOWED_DATA_TYPES) : any | undefined | null {
        if(this.hasProperty(propertyName) ) {
            switch(type) {
                case ALLOWED_DATA_TYPES.STRING_VALUE: 
                    return this.getStringValue(propertyName);
                case ALLOWED_DATA_TYPES.STRING_ARRAY:
                    return this.getStringArray(propertyName);
                case ALLOWED_DATA_TYPES.NUMBER_VALUE:
                    return this.getNumberValue(propertyName);
                case ALLOWED_DATA_TYPES.NUMBER_ARRAY:
                    return this.getNumberArray(propertyName);
                case ALLOWED_DATA_TYPES.BOOLEAN_VALUE:
                    return this.getBooleanValue(propertyName);
                case ALLOWED_DATA_TYPES.BOOLEAN_ARRAY:
                    return this.getBooleanArray(propertyName);
                case ALLOWED_DATA_TYPES.ANY_VALUE:
                    return this.getAnyValue(propertyName);
                case ALLOWED_DATA_TYPES.ANY_ARRAY:
                    return this.getAnyArray(propertyName);
                case ALLOWED_DATA_TYPES.OBJECT:
                    return this.getObject(propertyName);
            }
        }

        return undefined;
    }

    /**
     * checkEmptyValues() - This methods returns a string[] array with empty property values.
     * 
     */
    
    checkEmptyValues(properties: string[], ignoreProperties?: string[]) : string[] {
        let arr: string[] = [];

        for(let i = 0; i < properties.length; i++) {
            arr = (ignoreProperties !== undefined) ? this.mergeStringArrays(arr, this.checkExistenceWithIgnore(properties[i], ignoreProperties))  : this.mergeStringArrays(arr, this.checkExistence(properties[i]));
            arr = (ignoreProperties !== undefined) ? this.mergeStringArrays(arr, this.checkEmptyWithIgnore(properties[i], ignoreProperties)) : this.mergeStringArrays(arr, this.checkEmpty(properties[i]));
        }        

        return arr;
    }

    /**
     * checkExistence() - Checks if property exists.
     * 
     */

    private checkExistence(propertyName: string) : string[] {
        return this.hasProperty(propertyName) ? [] : ["Property: " + propertyName + " doesn't exist."];
    }

    /**
     * checkExistence() - Checks if property exists. Ignores propertyNames in ignoreProperties: string[].
     * 
     */

    private checkExistenceWithIgnore(propertyName: string, ignoreProperties: string[]) : string[] {
        let index: number = ignoreProperties.indexOf(propertyName);
        return (index > -1) ? [] : this.hasProperty(propertyName) ? [] : ["Property: " + propertyName + " doesn't exist."];
    }

    /**
     * checkEmpty() - Check for empty data.
     * 
     */

    private checkEmpty(propertyName: string) : string[] {
        return (!this.hasProperty(propertyName)) ? [] : (this.getAnyValue(propertyName) !== '') ? [] : ["Property: " + propertyName + " is empty."];
    }

    /**
     * checkEmptyWithIgnore() - Check for empty data, ignore values in ignoreProperties: string[].
     * 
     */

    private checkEmptyWithIgnore(propertyName: string, ignoreProperties: string[]) : string[] {
        let index: number = ignoreProperties.indexOf(propertyName);
        return (index > -1) ? [] : (this.getAnyValue(propertyName) === '') ? ["Property: " + propertyName + " is empty."] : [];
    }

    /**
     * mergeStringArrays() - Private method to merge 2 string[] arrays.
     * 
     */

    private mergeStringArrays(arr1: string[], arr2: string[]) : string[] {
        arr2.forEach(item => {
            arr1.push(item);
        });

        return arr1;
    }

    /**
     * getAdditionalData() - Method to get additional type-data from an array.
     * 
     */

    private getAdditionalData(value: any, regEx: RegExp) : string {
        return (value.length == 0) ? " Empty" : this.getArrayType(value, regEx);
    }

    /**
     * getArrayType() - Method inspects an array and derives its type.
     * 
     */

    private getArrayType(value: any, regEx: RegExp) : string {
        let allTypes: string[] = [];

        for(let i = 0; i < value.length; i++) {
            allTypes.push(Object.prototype.toString.call(value[i]).replace(regEx, ""));
        }

        let uniqueTypes: string[] = allTypes.filter((element, index) => {
            return allTypes.indexOf(element) === index;
        });

        return (uniqueTypes.length == 1) ? " " + uniqueTypes[0] : " Mixed";
    }

}