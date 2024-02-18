import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AddDataComponent } from './add-data.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DataRepositoryService } from 'src/app/services/data-repository.service';

describe('AddDataComponent', () => {
  let component: AddDataComponent;
  let fixture: ComponentFixture<AddDataComponent>;

  let mockDataRepository = {
    hasProperty: function() {
      return false;
    },
    addProperty: function() {
      
    }
  };

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [FormsModule, AddDataComponent],
      providers:[ { provide: DataRepositoryService, useValue: mockDataRepository } ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test input field propertyName', fakeAsync(async() => {
    const input: DebugElement = fixture.debugElement.query(By.css("input#addPropertyName"));
    input.nativeElement.value = "test";
    input.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    expect(component.propertyName).toBe("test");
  }));

  it('test input field addValue', fakeAsync(async() => {
    const input: DebugElement = fixture.debugElement.query(By.css("input#addValue"));
    input.nativeElement.value = "test";
    input.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    expect(component.propertyValue).toBe("test");
  }));

  it('test select options -> itemSelected value', fakeAsync(async() => {
    const select: DebugElement = fixture.debugElement.query(By.css("select"));

    let expectations: number = 0;

    for(let i = 0; i < component.selectOptions.length; i++) {
      select.nativeElement.selectedIndex = i;
      select.nativeElement.dispatchEvent(new Event('change'));
      
      fixture.detectChanges();
      tick();

      expect(component.itemSelected).toEqual(expectations);
      expectations++;
    }
  }));

  it('test form submit with values', fakeAsync(async() => {
    //TODO: Fix all below...
    let testPropertyName: string = "test";

    let testValues: any[] =           [      undefined, "",  "1", "a", "~",                               //string, removed: null
                                             undefined, "",  "1", "a", "^",                               //Numbers: removed null
                                       null, undefined, "",  "1", "a", "~", true, false, "true", "false", //boolean
                                                             "a,", "a,b,c",                               //string array removed empty string.
                                                             "1,",   "1, 2, 3",                           //number array,
                                                             "true,", "true, false, true",                //boolean array
                                              undefined, "", "test", "{\"test\":\"test\"}", "{}"          //object
                                      
    ];

    let type: number[] =              [      0,         0,   0,    0,    0,                               //string
                                             1,         1,   1,    1,    1,                               //Numbers: removed null
                                       2,    2,         2,   2,    2,    2,   2,  2,  2, 2,               //boolean
                                                             3,    3,                                     //string array
                                                             4,    4,                                     //number array,
                                                             5,    5,                                     //boolean array
                                              6,        6,   6,    6, 6                                   //object
    ];
    
    let testExpectations: boolean[] = [       true,    true,  true,  true,  true,                           //string
                                              false,   false, true,  false, false,                          //Numbers: removed null
                                      false,  false,   false, false, false, false, true, true, true, true,  //boolean
                                                              true, true,                                   //string array
                                                              true, true,                                   //number array,
                                                              true, true,                                   //boolean array
                                              false,  false,  false, true, true                             //Objects: removed null test.
    ];

    for(let i = 0; i < testValues.length; i++) {
      const inputPropertyName: DebugElement = fixture.debugElement.query(By.css("input#addPropertyName"));
      inputPropertyName.nativeElement.value = testPropertyName;
      inputPropertyName.nativeElement.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      tick();

      const inputPropertyValue: DebugElement = fixture.debugElement.query(By.css("input#addValue"));
      inputPropertyValue.nativeElement.value = testValues[i];
      inputPropertyValue.nativeElement.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      tick();

      const select: DebugElement = fixture.debugElement.query(By.css("select"));
      select.nativeElement.selectedIndex = type[i];
      select.nativeElement.dispatchEvent(new Event('change'));
      
      fixture.detectChanges();
      tick();

      const form: DebugElement = fixture.debugElement.query(By.css("form"));
      form.triggerEventHandler('submit', fixture.debugElement.nativeElement);

      fixture.detectChanges();
      tick();

      //below: test private methods !!!
      //@ts-ignore
      let converted: any = component.convertValue(testValues[i], type[i]);
      
      //@ts-ignore
      // let testedType = component.testDataType(converted, type[i]);
      //console.log(component.typeIsValid + "::" + testExpectations[i] + "::" + type[i] + "::" + converted + "::" + i);
      expect(component.typeIsValid).toEqual(testExpectations[i]);      
    }
  }));

  it('test private convertValue() method', () => {
    let testStringsValues: any[] =          [undefined,      null, "", "a", "1", "#"];
    let testStringsExpectations: any[] =    [undefined, undefined, undefined, "a", "1", "#"];
    
    for(let i = 0; i < testStringsValues.length; i++) {
      //@ts-ignore
      let converted: any = component.convertValue(testStringsValues[i], 0);
      expect(converted).toEqual(testStringsExpectations[i]);
    }

    let testNumberValues: any[] =           [undefined,      null, "", "a", "1", "#"];
    let testNumberExpectations: any[] =     [undefined, undefined, undefined, undefined, 1, undefined];

    for(let i = 0; i < testNumberValues.length; i++) {
      //@ts-ignore
      let converted: any = component.convertValue(testNumberValues[i], 1);
      expect(converted).toEqual(testNumberExpectations[i]);
    }

    let testBooleanValues: any[] =          [undefined,      null,        "",       "a",       "1",        "#", true, false, "true", "false"];
    let testBooleanExpectations: any[] =    [undefined, undefined, undefined, undefined, undefined, undefined,  true, false,   true,  false];

    for(let i = 0; i < testBooleanValues.length; i++) {
      //@ts-ignore
      let converted: any = component.convertValue(testBooleanValues[i], 2);
      expect(converted).toEqual(testBooleanExpectations[i]);
    }

    let testArrayStringValues: string[] = ["1,2,3,4", "a,b,c,d", ",,,", "null,undefined,false,true"];
    let testStringArrayExpectations: string[][] = [
      ["1", "2", "3", "4"],
      ["a", "b", "c", "d"],
      ["", "", "", ""],
      ["null", "undefined", "false", "true"],
    ];

    for(let i = 0; i < testArrayStringValues.length; i++) {
      //@ts-ignore
      let converted: any = component.convertValue(testArrayStringValues[i], 3);
      expect(converted).toEqual(testStringArrayExpectations[i]);
    }

    let testArrayNumberValues: string[] = ["1,2,3,4", "a,b,c,d", ",,,", "null,undefined,false,true"];
    let testNumberArrayExpectations: number[][] = [
      [1, 2, 3, 4],
      [NaN, NaN, NaN, NaN],
      [NaN, NaN, NaN, NaN],
      [NaN, NaN, NaN, NaN],
    ];

    for(let i = 0; i < testArrayNumberValues.length; i++) {
      //@ts-ignore
      let converted: any = component.convertValue(testArrayNumberValues[i], 4);
      expect(converted).toEqual(testNumberArrayExpectations[i]);
    }

    let testArrayBooleanValues: string[] = ["true,true,false,true", "1,2,3,4", "a,b,c,d", ",,,", "null,undefined,false,true"];
    let testBooleanArrayExpectations: (boolean | undefined)[][] = [
      [true, true, false, true],
      [undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined],
      [undefined, undefined, false, true],
    ];

    for(let i = 0; i < testArrayBooleanValues.length; i++) {
      //@ts-ignore
      let converted: any = component.convertValue(testArrayBooleanValues[i], 5);
      expect(converted).toEqual(testBooleanArrayExpectations[i]);
    }

    let testObjectValues: any[] = [null, undefined, "", "{}", "{\"test\": \"test\"}", "a,b,c,d", ",,,", "null,undefined"];
    let testObjectExpectations: any[] = [
      undefined,
      undefined,
      undefined,
      JSON.parse("{}"),
      JSON.parse("{\"test\": \"test\"}"),
      undefined,
      undefined,
      undefined
    ];
    
    for(let i = 0; i < testObjectValues.length; i++) {
      //@ts-ignore
      let converted: any = component.convertValue(testObjectValues[i], 6);      
      expect(converted).toEqual(testObjectExpectations[i]);
    }
  });

  it('test private method testDataType()', () => {
    let testValues: any[] =           ["",   undefined, "a",   1,    undefined, "",    undefined, true, false, new Array("1", "2", "3"), undefined,
    new Array(), new Array(1, 2, 3), undefined, new Array(), new Array(true, false), undefined, new Array(), JSON.parse("{\"test\": \"test\"}"),
    new Object(), undefined

    ];

    let testTypes: number[] =         [0,    0,          0,    1,    1,         1,     2,         2,    2,     3,                        3,
    3,          4,                    4,        4,            5,                    5,          5,            6, 
    6,          6
    ];

    let testExpectations: boolean[] = [true, false,      true, true, false,     false, false,     true, true,  true,                     false,
    false,      true,                 false,    false,        true,                 false,       false,       true,  
    true,       false    
    ];

    for(let i = 0; i < testValues.length; i++) {
      //@ts-ignore
      let isValid: boolean = component.testDataType(testValues[i], testTypes[i]);
      expect(isValid).toBe(testExpectations[i]);
    }

  });


});
