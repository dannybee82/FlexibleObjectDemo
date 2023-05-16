import { TestBed } from '@angular/core/testing';
import { FlexibleObject } from './FlexibleObject';

describe('DataRepositoryService', () => {

    let flexibleObject: FlexibleObject = new FlexibleObject();

    let testPropertyName: string = "test";

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

    //TODO: test setValue()

});