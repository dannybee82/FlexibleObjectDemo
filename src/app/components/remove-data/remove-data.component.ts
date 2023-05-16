import { Component } from '@angular/core';

//Services.
import { DataRepositoryService } from 'src/app/services/data-repository.service';

//Flexible Object.
import { FlexibleObject } from 'src/app/flexible-object/FlexibleObject';

@Component({
  selector: 'app-remove-data',
  templateUrl: './remove-data.component.html',
  styleUrls: ['./remove-data.component.css']
})

export class RemoveDataComponent {

  public propertyNames: string[] | undefined = [];
  public types: string[] | undefined = [];

  public isVisible: boolean = false;

  constructor(private dataRepositoryService: DataRepositoryService) {
    //Listen for changes.
    this.dataRepositoryService.getUpdateView().subscribe({
      next: (result) => {
        if(result) {
          this.show();
        }
      }
    });
  }

  remove(index: number) : void {
    if(this.propertyNames != undefined) {
      this.dataRepositoryService.removeProperty(this.propertyNames[index]);  
    }    
  }

  private getTypes() : void {
    if(this.propertyNames != undefined) {
      this.propertyNames.forEach(item => {
        this.types?.push( this.dataRepositoryService.getTypeOfProperty(item) ?? "Unknown" );
      });
    }
  }

  private show() : void {
    this.propertyNames, this.types = [];

    let flexibleObject: FlexibleObject = this.dataRepositoryService.getFlexibleObject();
    this.propertyNames = flexibleObject.getObjectKeys();
    this.getTypes();
    this.isVisible = (this.propertyNames?.length ?? 0 > 0) ? true : false;
  }

}