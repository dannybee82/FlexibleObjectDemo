import { Component } from '@angular/core';

//Services.
import { DataRepositoryService } from 'src/app/services/data-repository.service';

//Flexible Object.
import { FlexibleObject } from 'src/app/flexible-object/FlexibleObject';

@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.css']
})
export class ShowDataComponent {

  public isvisible: boolean = false;

  public flexibleObject?: FlexibleObject;
  
  constructor(private dataRepositoryService: DataRepositoryService) {
    //listen for changes.
    this.dataRepositoryService.getUpdateView().subscribe({
      next: (result) => {
        if(result) {
          this.show();
        }
      }
    });
  }

  private show() : void {
    this.flexibleObject = this.dataRepositoryService.getFlexibleObject();
    this.isvisible = (this.flexibleObject.hasContents()) ? true : false;
  }

}