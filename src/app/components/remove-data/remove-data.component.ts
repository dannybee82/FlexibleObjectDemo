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

  public keys: string[] | undefined = [];
  public types: string[] | undefined = [];

  public isVisible: boolean = false;

  constructor(private dataRepositoryService: DataRepositoryService) {
    //Listen for changes.
    this.dataRepositoryService.getUpdateView().subscribe({
      next: (result) => {
        if(result) {
          this.keys = [];
          this.types = [];

          let flexibleObject: FlexibleObject = this.dataRepositoryService.getFlexibleObject();
          this.keys = flexibleObject.getObjectKeys();
          this.getTypes();
          this.isVisible = (this.keys?.length ?? 0 > 0) ? true : false;
        }
      }
    });
  }

  remove(index: number) : void {
    if(this.keys != undefined) {
      this.dataRepositoryService.removeProperty(this.keys[index]);  
    }    
  }

  private getTypes() : void {
    if(this.keys != undefined) {
      this.keys.forEach(item => {
        this.types?.push( this.dataRepositoryService.getTypeOfProperty(item) ?? "Unknown" );
      });
    }
  }

}