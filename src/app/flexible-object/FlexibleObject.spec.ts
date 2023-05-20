import { TestBed } from '@angular/core/testing';
import { FlexibleObject } from './FlexibleObject';
import { ALLOWED_DATA_TYPES } from './FlexibleObjectData';
import { ObjectWithCustomProperties } from './FlexibleObjectData';

describe('DataRepositoryService', () => {

    let flexibleObject: FlexibleObject = new FlexibleObject();

    let testPropertyName: string = "test";

    let allowedDataTypes: ALLOWED_DATA_TYPES[] = [ALLOWED_DATA_TYPES.STRING_VALUE, ALLOWED_DATA_TYPES.STRING_ARRAY, ALLOWED_DATA_TYPES.NUMBER_VALUE, ALLOWED_DATA_TYPES.NUMBER_ARRAY, ALLOWED_DATA_TYPES.BOOLEAN_VALUE, ALLOWED_DATA_TYPES.BOOLEAN_ARRAY, ALLOWED_DATA_TYPES.ANY_VALUE, ALLOWED_DATA_TYPES.ANY_ARRAY, ALLOWED_DATA_TYPES.OBJECT];

    beforeEach(() => {
        TestBed.configureTestingModule({});
      });

    it('should be created', () => {
        expect(flexibleObject).toBeTruthy();
    });

    it('Test method: setStringValue() and getStringValue', () => {
        let testValues: any[] = [undefined, null, "", "a", "a,b,c", "1", "1,2,3", "~!@#$%^&*()"];
        let expectedValues: any[] = [null, null,  "", "a", "a,b,c", "1", "1,2,3", "~!@#$%^&*()"];

        for(let i = 0; i < testValues.length; i++) {
            flexibleObject.setStringValue(testPropertyName, testValues[i]);
            expect(flexibleObject.getStringValue(testPropertyName)).toEqual(expectedValues[i]);
        }
    });

    it('Test method: setStringArray() and getStringArray', () => {
        let testValues: any[] = [undefined, null, new Array(), new Array(""), new Array("a", "b", "c"), new Array("1", "2", "3")];
        let expectedValues: any[] = [null, null, [], [""], ["a","b","c"], ["1", "2", "3"]];

        for(let i = 0; i < testValues.length; i++) {
            flexibleObject.setStringArray(testPropertyName, testValues[i]);
            expect(flexibleObject.getStringArray(testPropertyName)).toEqual(expectedValues[i]);
        }
    });

    it('Test method: setNumberValue() and getNumberValue', () => {
        let testValues: any[] = [undefined, null, -3, -2, -1, 0, 1, 2, 3];
        let expectedValues: any[] = [null, null, -3, -2, -1, 0, 1, 2, 3];

        for(let i = 0; i < testValues.length; i++) {
            flexibleObject.setNumberValue(testPropertyName, testValues[i]);
            expect(flexibleObject.getNumberValue(testPropertyName)).toEqual(expectedValues[i]);
        }
    });

    it('Test method: setNumberArray() and getNumberArray', () => {
        let testValues: any[] = [undefined, null, new Array(), new Array(1).fill(1), new Array(1, 2, 3), new Array(-3, -2, -1, 0, 1, 2, 3)];
        let expectedValues: any[] = [null, null, [], [1], [1, 2, 3], [-3, -2, -1, 0, 1, 2, 3]];

        for(let i = 0; i < testValues.length; i++) {
            flexibleObject.setNumberArray(testPropertyName, testValues[i]);
            expect(flexibleObject.getNumberArray(testPropertyName)).toEqual(expectedValues[i]);
        }
    });

    it('Test method: setBooleanValue() and getBooleanValue', () => {
        let testValues: any[] = [undefined, null, true, false];
        let expectedValues: any[] = [null, null, true, false];

        for(let i = 0; i < testValues.length; i++) {
            flexibleObject.setBooleanValue(testPropertyName, testValues[i]);
            expect(flexibleObject.getBooleanValue(testPropertyName)).toEqual(expectedValues[i]);
        }
    });

    it('Test method: setBooleanArray() and getBooleanArray', () => {
        let testValues: any[] = [undefined, null, new Array(), new Array(true), new Array(true, false, true)];
        let expectedValues: any[] = [null, null, [], [true], [true, false, true]];

        for(let i = 0; i < testValues.length; i++) {
            flexibleObject.setBooleanArray(testPropertyName, testValues[i]);
            expect(flexibleObject.getBooleanArray(testPropertyName)).toEqual(expectedValues[i]);
        }
    });

    it('Test method: setAnyValue() and getAnyValue', () => {
        let testValues: any[] = [undefined, null, "", "a", "1", -1, 0, 1, true, false, JSON.parse("{\"test\": \"test\"}")];
        let expectedValues: any[] = [null, null, "", "a", "1", -1, 0, 1, true, false, JSON.parse("{\"test\": \"test\"}")];

        for(let i = 0; i < testValues.length; i++) {
            flexibleObject.setAnyValue(testPropertyName, testValues[i]);
            expect(flexibleObject.getAnyValue(testPropertyName)).toEqual(expectedValues[i]);
        }
    });

    it('Test method: setAnyArray() and getAnyArray', () => {
        let testValues: any[] = [undefined, null, new Array(), new Array(""), new Array(1).fill(1), new Array(true), new Array(null), new Array(JSON.parse("{\"test\": \"test\"}"))];
        let expectedValues: any[] = [null, null, [], [""], [1], [true], [null], new Array(JSON.parse("{\"test\": \"test\"}"))];

        for(let i = 0; i < testValues.length; i++) {
            flexibleObject.setAnyArray(testPropertyName, testValues[i]);
            expect(flexibleObject.getAnyArray(testPropertyName)).toEqual(expectedValues[i]);
        }
    });

    it('Test method: setObject() and getObject()', () => {
        let testValues: any[] = [undefined, null, JSON.parse("{\"test\": \"test\"}"), JSON.parse("{}")];
        let expectedValues: any[] = [null, null, JSON.parse("{\"test\": \"test\"}"), JSON.parse("{}")];

        for(let i = 0; i < testValues.length; i++) {
            flexibleObject.setObject(testPropertyName, testValues[i]);
            expect(flexibleObject.getObject(testPropertyName)).toEqual(expectedValues[i]);
        }
    });

    it('Test setValue() - values: undefined', () => {
        let testValues: any = undefined;
        let expectedValues: any = null;

        for(let i = 0; i < allowedDataTypes.length; i++) {
            flexibleObject.setValue(testPropertyName, testValues, allowedDataTypes[i]);
            expect(flexibleObject.getValue(testPropertyName, allowedDataTypes[i])).toEqual(expectedValues);
        }
    });

    it('Test setValue() - values: null', () => {
        let testValues: any = null;
        let expectedValues: any = null;

        for(let i = 0; i < allowedDataTypes.length; i++) {
            flexibleObject.setValue(testPropertyName, testValues, allowedDataTypes[i]);
            expect(flexibleObject.getValue(testPropertyName, allowedDataTypes[i])).toEqual(expectedValues);
        }
    });

    it('Test setValue() - empty or zero values', () => {
        let testValues: any[] = ["", new Array(""), 0, new Array(1).fill(0), false, new Array(false), "", new Array(), JSON.parse("{}")];
        let expectedValues: any[] = ["", [""], 0, [0], false, [false], "", [], JSON.parse("{}")];

        for(let i = 0; i < allowedDataTypes.length; i++) {
            flexibleObject.setValue(testPropertyName, testValues[i], allowedDataTypes[i]);
            expect(flexibleObject.getValue(testPropertyName, allowedDataTypes[i])).toEqual(expectedValues[i]);
        }
    });

    it('Test setValue() - not null values, etc.', () => {
        let testValues: any[] = ["a", new Array("b"), -12, new Array(1).fill(12), true, new Array(true), "hello", new Array("world"), JSON.parse("{\"test\": \"test\"}")];
        let expectedValues: any[] = ["a", ["b"], -12, [12], true, [true], "hello", ["world"], JSON.parse("{\"test\": \"test\"}")];

        for(let i = 0; i < allowedDataTypes.length; i++) {
            flexibleObject.setValue(testPropertyName, testValues[i], allowedDataTypes[i]);
            expect(flexibleObject.getValue(testPropertyName, allowedDataTypes[i])).toEqual(expectedValues[i]);
        }
    });

    it('Test method hasProperty()', () => {
        let properties: string[] = ["test_1", "2_test", "third_test", "fourth_test", "5th-test"];
        let values: any[] = ["", 12, true, JSON.parse("{\"test\": \"test\"}"), [1, 2, 3, 4]]
        let types: ALLOWED_DATA_TYPES[] = [ALLOWED_DATA_TYPES.STRING_VALUE, ALLOWED_DATA_TYPES.NUMBER_VALUE, ALLOWED_DATA_TYPES.BOOLEAN_VALUE, ALLOWED_DATA_TYPES.OBJECT, ALLOWED_DATA_TYPES.NUMBER_ARRAY];

        for(let i = 0; i < properties.length; i++) {
            flexibleObject.setValue(properties[i], values[i], types[i]);
            expect(flexibleObject.hasProperty(properties[i])).toBeTrue();
        }
    });

    it('Test method getType() - isVerbose = false', () => {
        //Fill Flexible Object.
        let values: any[] = ["hello world", ["hello", "world"], 12, [-12, 12], true, [true, false], "Some Value 123", [1, "mixed", true],  JSON.parse("{\"test\": \"test\"}")]
        let types: ALLOWED_DATA_TYPES[] = [ALLOWED_DATA_TYPES.STRING_VALUE, ALLOWED_DATA_TYPES.STRING_ARRAY, ALLOWED_DATA_TYPES.NUMBER_VALUE, ALLOWED_DATA_TYPES.NUMBER_ARRAY, ALLOWED_DATA_TYPES.BOOLEAN_VALUE, ALLOWED_DATA_TYPES.BOOLEAN_ARRAY, ALLOWED_DATA_TYPES.ANY_VALUE, ALLOWED_DATA_TYPES.ANY_ARRAY, ALLOWED_DATA_TYPES.OBJECT];
        let expectedTypes: string[] = ["[object String]", "[object Array]", "[object Number]", "[object Array]", "[object Boolean]", "[object Array]", "[object String]", "[object Array]", "[object Object]"];
           
        for(let i = 0; i < values.length; i++) {
            flexibleObject.setValue(testPropertyName, values[i], types[i]);
            expect(flexibleObject.getType(testPropertyName)).toEqual(expectedTypes[i]);
        }
    });

    it('Test method getType() - isVerbose = true', () => {
        //Fill Flexible Object.
        let values: any[] = ["hello world", ["hello", "world"], 12, [-12, 12], true, [true, false], "Some Value 123", [1, "mixed", true],  JSON.parse("{\"test\": \"test\"}"), null, undefined]
        let types: ALLOWED_DATA_TYPES[] = [ALLOWED_DATA_TYPES.STRING_VALUE, ALLOWED_DATA_TYPES.STRING_ARRAY, ALLOWED_DATA_TYPES.NUMBER_VALUE, ALLOWED_DATA_TYPES.NUMBER_ARRAY, ALLOWED_DATA_TYPES.BOOLEAN_VALUE, ALLOWED_DATA_TYPES.BOOLEAN_ARRAY, ALLOWED_DATA_TYPES.ANY_VALUE, ALLOWED_DATA_TYPES.ANY_ARRAY, ALLOWED_DATA_TYPES.OBJECT, ALLOWED_DATA_TYPES.ANY_VALUE, ALLOWED_DATA_TYPES.ANY_VALUE];
        let expectedTypes: string[] = ["String", "Array String", "Number", "Array Number", "Boolean", "Array Boolean", "String", "Array Mixed", "Object", "Null", "Null"];
           
        for(let i = 0; i < values.length; i++) {
            flexibleObject.setValue(testPropertyName, values[i], types[i]);
            expect(flexibleObject.getType(testPropertyName, true)).toEqual(expectedTypes[i]); //See 2nd argument of getType(): true
        }
    });

    it('Test method isExpectedType() - returns: capital letters', () => {
        let values: any[] = ["hello world", ["hello", "world"], 12, [-12, 12], true, [true, false], "Some Value 123", [1, "mixed", true],  JSON.parse("{\"test\": \"test\"}"), null, undefined]
        let types: ALLOWED_DATA_TYPES[] = [ALLOWED_DATA_TYPES.STRING_VALUE, ALLOWED_DATA_TYPES.STRING_ARRAY, ALLOWED_DATA_TYPES.NUMBER_VALUE, ALLOWED_DATA_TYPES.NUMBER_ARRAY, ALLOWED_DATA_TYPES.BOOLEAN_VALUE, ALLOWED_DATA_TYPES.BOOLEAN_ARRAY, ALLOWED_DATA_TYPES.ANY_VALUE, ALLOWED_DATA_TYPES.ANY_ARRAY, ALLOWED_DATA_TYPES.OBJECT, ALLOWED_DATA_TYPES.ANY_VALUE, ALLOWED_DATA_TYPES.ANY_VALUE];
        let expectedTypes: any[] = [["String"],["Array String"],["Number"],["Array Number"],["Boolean"],["Array Boolean"],["String"],["Array Mixed"],["Object"],["Null"],["Null"]];
           
        for(let i = 0; i < values.length; i++) {
            flexibleObject.setValue(testPropertyName, values[i], types[i]);
            expect(flexibleObject.isExpectedType(testPropertyName, expectedTypes[i])).toBeTrue();
        }
    });

    it('Test method isExpectedType() - returns: small letters', () => {
        let values: any[] = ["hello world", ["hello", "world"], 12, [-12, 12], true, [true, false], "Some Value 123", [1, "mixed", true],  JSON.parse("{\"test\": \"test\"}"), null, undefined]
        let types: ALLOWED_DATA_TYPES[] = [ALLOWED_DATA_TYPES.STRING_VALUE, ALLOWED_DATA_TYPES.STRING_ARRAY, ALLOWED_DATA_TYPES.NUMBER_VALUE, ALLOWED_DATA_TYPES.NUMBER_ARRAY, ALLOWED_DATA_TYPES.BOOLEAN_VALUE, ALLOWED_DATA_TYPES.BOOLEAN_ARRAY, ALLOWED_DATA_TYPES.ANY_VALUE, ALLOWED_DATA_TYPES.ANY_ARRAY, ALLOWED_DATA_TYPES.OBJECT, ALLOWED_DATA_TYPES.ANY_VALUE, ALLOWED_DATA_TYPES.ANY_VALUE];
        let expectedTypes: any[] = [["string"],["array string"],["number"],["array number"],["boolean"],["array boolean"],["string"],["array mixed"],["object"],["null"],["null"]];
           
        for(let i = 0; i < values.length; i++) {
            flexibleObject.setValue(testPropertyName, values[i], types[i]);
            expect(flexibleObject.isExpectedType(testPropertyName, expectedTypes[i], true)).toBeTrue();
        }
    });

    it('Test method removeProperty()', () => {
        //Clear from previous tests.
        flexibleObject.clearAll();

        let propertyNames: string[] = ["test_1", "test_2", "test_3", "test_4", "test_5", "test_6", "test_7", "test_8", "test_9", "test_10", "test_11"];
        let values: any[] = ["hello world", ["hello", "world"], 12, [-12, 12], true, [true, false], "Some Value 123", [1, "mixed", true],  JSON.parse("{\"test\": \"test\"}"), null, undefined]
        let types: ALLOWED_DATA_TYPES[] = [ALLOWED_DATA_TYPES.STRING_VALUE, ALLOWED_DATA_TYPES.STRING_ARRAY, ALLOWED_DATA_TYPES.NUMBER_VALUE, ALLOWED_DATA_TYPES.NUMBER_ARRAY, ALLOWED_DATA_TYPES.BOOLEAN_VALUE, ALLOWED_DATA_TYPES.BOOLEAN_ARRAY, ALLOWED_DATA_TYPES.ANY_VALUE, ALLOWED_DATA_TYPES.ANY_ARRAY, ALLOWED_DATA_TYPES.OBJECT, ALLOWED_DATA_TYPES.ANY_VALUE, ALLOWED_DATA_TYPES.ANY_VALUE];
        let expectedLength: number = propertyNames.length;

        //Fill Flexible Object.
        for(let i = 0; i < propertyNames.length; i++) {
            flexibleObject.setValue(propertyNames[i], values[i], types[i]);
        }

        expect(flexibleObject.getPropertyAmount()).toEqual(expectedLength);
        expectedLength--;

        for(let i = 0; i < propertyNames.length; i++) {
            flexibleObject.removeProperty(propertyNames[i]);
            expect(flexibleObject.getPropertyAmount()).toEqual(expectedLength);
            expectedLength--;
        }
    });

    it('Test other methods - clearAll(), hasContents(), getFlexibleObject(), hasProperty(), getPropertyNames()', () => {
         //Clear from previous tests.
         flexibleObject.clearAll();

        expect(flexibleObject.hasContents()).toBeFalse();

        flexibleObject.setStringValue(testPropertyName, "test");
        expect(flexibleObject.hasContents()).toBeTrue();

        let fo: ObjectWithCustomProperties = flexibleObject.getFlexibleObject();
        expect(fo[testPropertyName]).toContain("test");

        expect(flexibleObject.hasProperty(testPropertyName)).toBeTrue();
        
        flexibleObject.clearAll();
        expect(flexibleObject.getPropertyNames()).toBeUndefined();

        let propertyNames: string[] = ["test_1", "test_2", "test_3", "test_4", "test_5", "test_6", "test_7", "test_8", "test_9", "test_10", "test_11"];
        let value: string = "";

        for(let i = 0; i < propertyNames.length; i++) {
            flexibleObject.setStringValue(propertyNames[i], value);
        }

        expect(flexibleObject.getPropertyNames()).toEqual(propertyNames);
    });

    it('Test method: checkEmptyValues()', () => {
        //Clear from previous tests.
        flexibleObject.clearAll();

        let propertyNames: string[] = ["test_1", "test_2", "test_3", "test_4", "test_5", "test_6", "test_7", "test_8", "test_9", "test_10", "test_11"];
        let value: string = "";

        for(let i = 0; i < propertyNames.length; i++) {
            flexibleObject.setStringValue(propertyNames[i], value);
        }

        let expectationResult: string[] = ["Property: test_1 is empty.","Property: test_2 is empty.","Property: test_3 is empty.","Property: test_4 is empty.","Property: test_5 is empty.","Property: test_6 is empty.","Property: test_7 is empty.","Property: test_8 is empty.","Property: test_9 is empty.","Property: test_10 is empty.","Property: test_11 is empty."];
        expect(flexibleObject.checkEmptyValues(propertyNames)).toEqual(expectationResult);

        let testDoesntExist: string[] = ["property_doesnt_exist_1", "property_doesnt_exist_2", "property_doesnt_exist_3"];
        let expectationDoensntExist: string[] = ["Property: property_doesnt_exist_1 doesn't exist.","Property: property_doesnt_exist_2 doesn't exist.","Property: property_doesnt_exist_3 doesn't exist."];

        //Test for doesn't exist & ignore previous properties.
        expect(flexibleObject.checkEmptyValues(testDoesntExist)).toEqual(expectationDoensntExist);

        //Final test with ignore all properties.
        expect(flexibleObject.checkEmptyValues(propertyNames,propertyNames)).toEqual([]);
    });

});