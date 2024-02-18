import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser'
import { ShowDataComponent } from './show-data.component';
import { BehaviorSubject } from 'rxjs';
import { FlexibleObject } from 'src/app/flexible-object/FlexibleObject';
import { DataRepositoryService } from 'src/app/services/data-repository.service';

describe('ShowDataComponent', () => {
  let component: ShowDataComponent;
  let fixture: ComponentFixture<ShowDataComponent>;

  let listener: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  let flexibleObject: FlexibleObject = new FlexibleObject();

  let propertyNamesToExpect: string[] = ["test_1","test_2","test_3","test_4","test_5"];

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
    }
  };

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [ {provide: DataRepositoryService, useValue: mockDataRepository} ],
      imports: [ShowDataComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test show data from FlexibleObject.', fakeAsync(async() => {
    listener.next(true);
    //@ts-ignore
    component.show();
    fixture.detectChanges();
    tick();

    let dataInPreElement: DebugElement = fixture.debugElement.query(By.css("div"));

    expect(dataInPreElement.nativeElement.innerText).toContain("_flexibleObject");

    for(let i = 0; i < propertyNamesToExpect.length; i++) {
      expect(dataInPreElement.nativeElement.innerText).toContain(propertyNamesToExpect[i]);
    }
  }));

});