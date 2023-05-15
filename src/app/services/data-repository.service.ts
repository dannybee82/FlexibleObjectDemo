import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

//Flexible object.
import { FlexibleObject } from '../flexible-object/FlexibleObject';
import { ALLOWED_DATA_TYPES } from '../flexible-object/FlexibleObjectData';

@Injectable({
  providedIn: 'root'
})

export class DataRepositoryService {

  private _flexibleObject: FlexibleObject;

  private _updateView: BehaviorSubject<boolean>;

  private _dataTypeOrder: ALLOWED_DATA_TYPES[] = [
    ALLOWED_DATA_TYPES.STRING_VALUE,
    ALLOWED_DATA_TYPES.NUMBER_VALUE,
    ALLOWED_DATA_TYPES.BOOLEAN_VALUE,
    ALLOWED_DATA_TYPES.STRING_ARRAY,
    ALLOWED_DATA_TYPES.NUMBER_ARRAY,
    ALLOWED_DATA_TYPES.BOOLEAN_ARRAY,
    ALLOWED_DATA_TYPES.OBJECT
  ];

  constructor() {
    this._flexibleObject = new FlexibleObject();
    this._updateView = new BehaviorSubject<boolean>(false);
  }

  addProperty(propertyName: string, value: any, type: number) : void {
    this._flexibleObject.setValue(propertyName, value, this.getDataType(type));
    this.setUpdateView(true);
  }

  hasProperty(propertyName: string) : boolean {
    return this._flexibleObject.hasProperty(propertyName);
  }

  removeProperty(propertyName: string) : void {
    this._flexibleObject.removeProperty(propertyName);
    this.setUpdateView(true);
  }

  getTypeOfProperty(propertyName: string) : string | undefined {
    return this._flexibleObject.getType(propertyName, true);
  }

  getFlexibleObject() : FlexibleObject {
    return this._flexibleObject;
  }

  setUpdateView(value: boolean) : void {
    this._updateView.next(value)
  }
  
  getUpdateView() : BehaviorSubject<boolean> {
    return this._updateView;
  }
    
  private getDataType(type: number) : ALLOWED_DATA_TYPES {
    return this._dataTypeOrder[type];
  }

}