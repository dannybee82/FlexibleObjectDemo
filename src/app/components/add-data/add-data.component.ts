import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

//Services.
import { DataRepositoryService } from 'src/app/services/data-repository.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent {

  public addPropertyName: string = "";
  public addValue: string = "";
  
  public itemSelected: number = 0;

  public selectItems: string[] = ["String", "Number", "Boolean", "String Array", "Number Array", "Boolean Array", "Object"];
  public itemsTooltips: string[] = [
    "Enter a String value e.g.: pear",
    "Enter a Number value e.g.: 3",
    "Enter a Boolean value e.g: true or false",
    "String Array - separate values by commas e.g.: ananas, lemon, peach",
    "Number Array - separate values by commas e.g.: 1, 2, 3",
    "Boolean Array - separate values by commas e.g.: true, false, true",
    "Object - place properties in JSON between braces e.g.: {\"fruit\": \"apple\"}"
  ];

  public typeIsValid: boolean = true;
  public propertyAlreadyExists: boolean = false;

  public error: string = "";

  constructor(private dataRepositoryService: DataRepositoryService) {}

  changeOption(value: string) : void {
    let parsed: number = parseInt(value);
    this.itemSelected = parsed;
  }

  submitForm(form: NgForm) : void {
    if(form.valid) {
      const finalValue = this.cast(this.addValue, this.itemSelected);

      this.typeIsValid = this.testDataType(finalValue, this.itemSelected);

      let testObject: boolean = true;

      if(this.itemSelected == 6) {
        testObject = this.canParseObject();
      }

      if(this.typeIsValid && testObject) { 
        this.propertyAlreadyExists = this.dataRepositoryService.hasProperty(this.addPropertyName);
        
        if(!this.propertyAlreadyExists) {
          this.addProperty();
        }
      } else {
        if(!this.typeIsValid) {
          this.error = "Value Type invalid.";
        } else {
          this.error = "Can't parse object.";
        }
      }     
    } else {
      this.error = "Form invalid.";
    }
  }

  overwrite(isOverwrite: boolean) : void {
    if(isOverwrite) {
      this.addProperty();
    }

    this.propertyAlreadyExists = false;
  }

  private testDataType(value: any, type: number) : boolean {
    console.log(Object.prototype.toString.call(value).toLowerCase());

    switch(type) {
      case 0:
        return (Object.prototype.toString.call(value).toLowerCase() === '[object string]') ? true : false;
      case 1:
        return (Object.prototype.toString.call(value).toLowerCase() === '[object number]') ? true : false;
      case 2:
        return (Object.prototype.toString.call(value).toLowerCase() === '[object boolean]') ? true : false;
      case 3: 
        return (value.length == 0) ? false : (Object.prototype.toString.call(value[0]).toLowerCase() === '[object string]') ? true : false;
      case 4:
        return (value.length == 0) ? false : (Object.prototype.toString.call(value[0]).toLowerCase() === '[object number]') ? true : false;
      case 5:
        return (value.length == 0) ? false : (Object.prototype.toString.call(value[0]).toLowerCase() === '[object boolean]') ? true : false;
      case 6:
        return (Object.prototype.toString.call(value).toLowerCase() === '[object object]') ? true : false;
    }

    return false;
  }

  private cast(value: any, type: number) : any | undefined {
    switch(type) {
      case 0:
        return value;
      case 1:
        return parseInt(value);
      case 2:
        let b: boolean | undefined = (value.trim() === 'true') ? true : (value.trim() === 'false') ? false : undefined;
        return b;
      case 3:
        let splittedStrings: string[] = value.split(',')
        return splittedStrings.map(item => {
          return item.trim();
        });
      case 4:
        let splittedNumbers: string[] = value.split(',');
        return splittedNumbers.map(item => {
          return parseInt(item, 10);
        });
      case 5:
        let splittedBooleans: string[] = value.split(',');
        return splittedBooleans.map(item => {
          return (item.trim() === 'true') ? true : (item.trim() === 'false') ? false : undefined;
        });
      case 6:
        try {
          return JSON.parse(value); 
        } catch { 
          return "Unable to parse object.";
        };
    }

    return undefined;
  }

  private canParseObject() : boolean {
    try {
      let obj: object = this.cast(this.addValue, this.itemSelected);
      return this.testDataType(obj, 6);
    } catch {
      return false;
    }
  }

  private addProperty() : void {
    const finalValue = this.cast(this.addValue, this.itemSelected);
    this.dataRepositoryService.addProperty(this.addPropertyName, finalValue, this.itemSelected);
  }

}