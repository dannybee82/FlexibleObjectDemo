import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DataRepositoryService } from 'src/app/services/data-repository.service';
import { RemoveDataComponent } from './remove-data.component';
import { BehaviorSubject } from 'rxjs';
import { FlexibleObject } from 'src/app/flexible-object/FlexibleObject';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('RemoveDataComponent', () => {
  let component: RemoveDataComponent;
  let fixture: ComponentFixture<RemoveDataComponent>;

  let listener: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  let flexibleObject: FlexibleObject = new FlexibleObject();

  let propertyNamesToExpect: string[] = ["test_1","test_2","test_3","test_4","test_5"];
  let typesToExpect: string[] = ["number", "string", "boolean", "string array", "object"];

  let mockDataRepository = {
    getUpdateView: function() {
      return listener
    },
    getFlexibleObject: function() {
      //Add some data.
      flexibleObject.setAnyValue("test_1", 1);
      flexibleObject.setAnyValue("test_2", "test");
      flexibleObject.setAnyValue("test_3", false);
      flexibleObject.setAnyValue("test_4", [1, 2, 3]);
      flexibleObject.setAnyValue("test_5", JSON.parse("{\"test\": \"test\"}"));

      return flexibleObject;
    },
    getObjectKeys: function() {
      return propertyNamesToExpect;
    },
    getTypes: function() {
      return typesToExpect;
    },
    getTypeOfProperty: function(prop: string) {
      let index: number = propertyNamesToExpect.findIndex(item => item === prop);
      return (index > -1) ? typesToExpect[index] : "???";
    },
    removeProperty: function(index: number) {
      propertyNamesToExpect.splice(index, 1);
      typesToExpect.splice(index, 1);
      listener.next(true);
    }
  };

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [{provide: DataRepositoryService, useValue: mockDataRepository}],
      imports: [RemoveDataComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(RemoveDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test: show contents of flexible object - component & template', fakeAsync(async() => {
    listener.next(true);
    //@ts-ignore
    component.show();
    fixture.detectChanges();
    tick();

    expect(component.propertyNames?.length).toEqual(propertyNamesToExpect.length);
    expect(component.types?.length).toEqual(typesToExpect.length);   

    let properties: DebugElement[] = fixture.debugElement.queryAll(By.css("#propertyName"));
    let types: DebugElement[] = fixture.debugElement.queryAll(By.css("#typeName"));

    expect(properties.length).toBe(propertyNamesToExpect.length);
    expect(types.length).toBe(typesToExpect.length);
    
    for(let i = 0; i < properties.length; i++) {
      expect(properties[i].nativeElement.innerText).toContain(propertyNamesToExpect[i]);
    }

    for(let i = 0; i < types.length; i++) {
      expect(types[i].nativeElement.innerText).toContain(typesToExpect[i]);
    }
  }));

  it('Test remove button', fakeAsync(async() => {
    listener.next(true);
    //@ts-ignore
    component.show();
    fixture.detectChanges();
    tick();

    let expectedLength: number[] = [4, 3, 2, 1, 0];

    for(let i = 0; i < expectedLength.length; i++) {
      //Get the first button
      let button: DebugElement = fixture.debugElement.query(By.css("button"));
      button.nativeElement.dispatchEvent(new Event('click'));

      fixture.detectChanges();
      tick();

      expect(propertyNamesToExpect.length).toBe(expectedLength[i]);
      expect(typesToExpect.length).toBe(expectedLength[i]);
    }
    
    //Reset values.
    propertyNamesToExpect = ["test_1","test_2","test_3","test_4","test_5"];
    typesToExpect = ["number", "string", "boolean", "string array", "object"];
  }));


});