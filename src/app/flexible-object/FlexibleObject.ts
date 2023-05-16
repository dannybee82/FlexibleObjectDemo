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
     * setStringArray() - Adds a new property with a string array.
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
     * setNumberArray() - Adds a new property with a number array.
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
     * setBooleanArray() - Adds a new property with a boolean array.
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
     * setValue() - Adds a new property with a specific value at specified index.
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
     * @param isVerbose = optional parameter. Can return: String, Number, Boolean, Object, Array String, Array Number, Array Boolean, Array Empty.
     * 
     */

    getType(propertyName: string, isVerbose?: boolean) : string | undefined {
        if(this.hasProperty(propertyName)) {
            let value: any = this._flexibleObject[propertyName]; 

            if(!isVerbose) {                 
                return Object.prototype.toString.call(value);
            } else {
                const regEx: RegExp = /^.*\s|\]{1}$/g;
                let type: string = Object.prototype.toString.call(value).replace(regEx, "");

                if(type === 'Array') {
                    if(value.length == 0) {
                        type += " Empty";
                    } else {
                        type += " " + Object.prototype.toString.call(value[0]).replace(regEx, "");
                    }
                }

                return type;
            }            
        }

        return undefined;
    }

    /**
     * isExpectedType() : Tests if the property is of the expected types.
    * 
    * @param types = Use: String, Number, Boolean, Object, Array String, Array Number, Array Boolean, Array Unknown, or Null
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
     * getObjectKeys() - Methot to get all the keys in this Flexible-object.
     * 
     */

    getObjectKeys() : string[] | undefined {
        let keys: string[] = Object.keys(this._flexibleObject) ?? [];

        if(keys.length > 0) {
            return keys;
        }

        return undefined;
    }

    /**
     * hasContents() - Method to check if the Flexible-object has any contents.
     * 
     */

    hasContents() : boolean {
        return (this.getObjectKeys() != undefined) ? true : false; 
    }

    /**
     * getStringValue() - Gets the string value of a property.
     * 
     */

    getStringValue(propertyName: string) : string | null {
        if(this.hasProperty(propertyName) && this.isExpectedType(propertyName, ["string", "null"], true)) {
            return this._flexibleObject[propertyName];
        }

        return "";
    }

    /**
     * getStringArray() - Gets the string[] array of a property.
     * 
     */

    getStringArray(propertyName: string) : string[] | undefined | null {
        if(this.hasProperty(propertyName) && this.isExpectedType(propertyName, ["array string", "array empty", "null"], true)) {
            return this._flexibleObject[propertyName];
        }

        return undefined;
    }

    /**
     * getNumberValue() - Gets the number value of a property.
     * 
     */

    getNumberValue(propertyName: string, defaultValue?: number) : number | null {
        if(this.hasProperty(propertyName) && this.isExpectedType(propertyName, ["number", "null"], true)) {
            return this._flexibleObject[propertyName];
        }

        return defaultValue ?? 0;
    }

    /**
     * getNumberArray() - Gets the number[] array of a property.
     * 
     */

    getNumberArray(propertyName: string) : number[] | undefined | null {
        if(this.hasProperty(propertyName) && this.isExpectedType(propertyName, ["array number", "array empty", "null"], true)) {
            return this._flexibleObject[propertyName];
        }

        return undefined;
    }

    /**
     * getBooleanValue() - Gets the boolean value of a property.
     * 
     */

    getBooleanValue(propertyName: string, defaultValue?: boolean) : boolean | null {
        if(this.hasProperty(propertyName) && this.isExpectedType(propertyName, ["boolean", "null"], true)) {
            return this._flexibleObject[propertyName];
        }

        return defaultValue ?? false;
    }

    /**
     * getBooleanArray() - Gets the boolean[] array of a property.
     * 
     */

    getBooleanArray(propertyName: string) : boolean[] | undefined | null {
        if(this.hasProperty(propertyName) && this.isExpectedType(propertyName, ["array boolean", "array empty", "null"], true)) {
            return this._flexibleObject[propertyName];
        }

        return undefined;
    }

    /**
     * getAnyValue() - Gets the any value of a property from specified index.
     * 
     */

    getAnyValue(propertyName: string, defaultValue?: any) : any | null {
        if(this.hasProperty(propertyName)) {
            return this._flexibleObject[propertyName];
        }

        return defaultValue ?? "";
    }

    /**
     * getAnyArray() - Gets the any[] array of a property from specified index.
     * 
     */

    getAnyArray(propertyName: string) : any[] | undefined | null {
        if(this.hasProperty(propertyName)) {
            return this._flexibleObject[propertyName];
        }

        return undefined;
    }

    /**
     * getObject() - Gets the object of a property.
     * 
     */

    getObject(propertyName: string) : object | undefined | null {
        if(this.hasProperty(propertyName) && this.isExpectedType(propertyName, ["object", "null"], true)) {
            return this._flexibleObject[propertyName];
        }

        return undefined;
    }

    /**
     * getValue() - Gets the value of a specified property with type.
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
            if(this.hasProperty(properties[i])) {
                if(ignoreProperties != undefined) {
                    let index: number = ignoreProperties.indexOf(properties[i]);

                    if(index == -1) {
                        if(this.getAnyValue(properties[i]) === '') {
                            arr.push( "Property: " + properties[i] + " is empty.");
                        }
                    }
                } else {
                    if(this.getAnyValue(properties[i]) === '') {
                        arr.push( "Property: " + properties[i] + " is empty.");
                    }
                }
            } else {
                arr.push( "Property: " + properties[i] + " doesn't exist.");
            }
        }        

        return arr;
    }

}