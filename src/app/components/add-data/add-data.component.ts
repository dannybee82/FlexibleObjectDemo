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

  public propertyName: string = "";
  public propertyValue: string = "";
  
  public itemSelected: number = 0;

  public selectOptions: string[] = ["String", "Number", "Boolean", "String Array", "Number Array", "Boolean Array", "Object"];
  public selectOptionsToolTips: string[] = [
    "Enter a String value e.g.: pear",
    "Enter a Number value e.g.: 3",
    "Enter a Boolean value e.g: true or false",
    "String Array - separate values by commas e.g.: ananas, lemon, peach",
    "Number Array - separate values by commas e.g.: 1, 2, 3",
    "Boolean Array - separate values by commas e.g.: true, false, true",
    "Object - place properties in JSON between braces e.g.: {\"fruit\": \"apple\"}"
  ];

  public typeIsValid: boolean = false;
  public propertyAlreadyExists: boolean = false;

  public hasError: boolean = false;
  public error: string = "";

  constructor(private dataRepositoryService: DataRepositoryService) {}

  changeOption(value: number) : void {
    this.itemSelected = value;
  }

  submitForm(form: NgForm) : void {
    if(form.valid) {
      const finalValue = this.convertValue(this.propertyValue, this.itemSelected);
      this.typeIsValid = this.testDataType(finalValue, this.itemSelected);

      if(this.typeIsValid) { 
        this.propertyAlreadyExists = this.dataRepositoryService.hasProperty(this.propertyName);
        
        this.hasError = false;

        if(!this.propertyAlreadyExists) {
          this.addProperty();
        }
      } else {
        this.hasError = true;
        this.error = "Value of type invalid.";
      }     
    } else {
      this.hasError = true;
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
    if(value === undefined || value === null) {
      return false;
    }

    const objectName: string = Object.prototype.toString.call(value).toLowerCase();

    switch(type) {
      case 0:
        return (objectName === '[object string]') ? true : false;
      case 1:
        return (objectName === '[object number]') ? true : false;
      case 2:
        return (objectName === '[object boolean]') ? true : false;
      case 3: 
        return (value.length == 0) ? false : (Object.prototype.toString.call(value[0]).toLowerCase() === '[object string]') ? true : false;
      case 4:
        return (value.length == 0) ? false : (Object.prototype.toString.call(value[0]).toLowerCase() === '[object number]') ? true : false;
      case 5:
        return (value.length == 0) ? false : (Object.prototype.toString.call(value[0]).toLowerCase() === '[object boolean]') ? true : false;
      case 6:
        return (objectName === '[object object]') ? true : false;
    }

    return false;
  }

  private convertValue(value: any, type: number) : any | undefined {
    if(value === undefined || value === null || value === '') {
      return undefined;
    }

    switch(type) {
      case 0:
        return  value;
      case 1:
        const regEx: RegExp = /^\-{0,1}[\d]+$/g;
        return (value.match(regEx)) ? parseInt(value) : undefined;
      case 2:
        return (value === true || value === false) ? value : (value.trim() === 'true') ? true : (value.trim() === 'false') ? false : undefined;
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
          return undefined;
        };
    }

    return undefined;
  }

  private addProperty() : void {
    const finalValue = this.convertValue(this.propertyValue, this.itemSelected);
    this.dataRepositoryService.addProperty(this.propertyName, finalValue, this.itemSelected);
  }

}