import { Component, OnInit, inject } from '@angular/core';

//Services.
import { DataRepositoryService } from 'src/app/services/data-repository.service';

//Flexible Object.
import { FlexibleObject } from 'src/app/flexible-object/FlexibleObject';

@Component({
	standalone: true,
  selector: 'app-remove-data',
  templateUrl: './remove-data.component.html',
  styleUrls: ['./remove-data.component.css']
})

export class RemoveDataComponent implements OnInit {

  public propertyNames: string[] | undefined = [];
  public types: string[] | undefined = [];

  private dataRepositoryService = inject(DataRepositoryService);

  ngOnInit() : void {
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
    this.propertyNames = flexibleObject.getPropertyNames();
    this.getTypes();
  }

}