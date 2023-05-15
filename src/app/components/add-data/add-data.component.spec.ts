import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AddDataComponent } from './add-data.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AddDataComponent', () => {
  let component: AddDataComponent;
  let fixture: ComponentFixture<AddDataComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [AddDataComponent],
      imports: [FormsModule]
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

    expect(component.addPropertyName).toBe("test");
  }));

  it('test input field addValue', fakeAsync(async() => {
    const input: DebugElement = fixture.debugElement.query(By.css("input#addValue"));
    input.nativeElement.value = "test";
    input.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    expect(component.addValue).toBe("test");
  }));


});
