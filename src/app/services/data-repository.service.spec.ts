import { TestBed, fakeAsync } from '@angular/core/testing';

import { DataRepositoryService } from './data-repository.service';

describe('DataRepositoryService', () => {
  let service: DataRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Test addProperty() and getTypeOfProperty() method in DataRepositoryService', () => {
    let tryToAdd: any[] = [null, "", "abc", "123", 123, true, ["a","b","c"], [1,2,3], [true, true, false], JSON.parse("{\"test\": \"test\"}")];
    let propertyName: string = "test";
    let typeValues: number[] = [6, 0, 0, 0, 1, 2, 3, 4, 5, 6];
    let typeNames: string[] = ["Null", "String", "String", "String", "Number", "Boolean", "Array String", "Array Number", "Array Boolean", "Object"];

    for(let i = 0; i < tryToAdd.length; i++) {
      service.addProperty(propertyName + "_" + i, tryToAdd[i], typeValues[i]);
      expect(typeNames[i]).toContain(service.getTypeOfProperty(propertyName + "_" + i) ?? "unknown");      
    }
  });

  it('Test method: getFlexibleObject() and test its length', () => {
    let tryToAdd: any[] = [null, "", "abc", "123", 123, true, ["a","b","c"], [1,2,3], [true, true, false], JSON.parse("{\"test\": \"test\"}")];
    let propertyName: string = "test";
    let typeValues: number[] = [6, 0, 0, 0, 1, 2, 3, 4, 5, 6];

    for(let i = 0; i < tryToAdd.length; i++) {
      service.addProperty(propertyName + "_" + i, tryToAdd[i], typeValues[i]);    
    }

    expect(service.getFlexibleObject().getPropertyAmount()).toEqual(typeValues.length);
  });

  it('Test methods: setUpdateView() getUpdateView() -> BehaviorSubject', fakeAsync(async() => {
    let hasFiredTrue: boolean = false;
    let hasFiredFalse: boolean = false;

    service.getUpdateView().subscribe({
      next: (result) => {
        if(result) {
          hasFiredTrue = true;
        } else {
          hasFiredFalse = true;
        }
      } 
    });

    service.setUpdateView(true);
    service.setUpdateView(false);

    expect(hasFiredTrue).toBeTrue();
    expect(hasFiredFalse).toBeTrue();
  }));

});