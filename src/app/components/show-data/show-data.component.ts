import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';

//Services.
import { DataRepositoryService } from 'src/app/services/data-repository.service';

//Flexible Object.
import { FlexibleObject } from 'src/app/flexible-object/FlexibleObject';
import { CommonModule } from '@angular/common';

@Component({
	standalone: true,
	imports: [
		CommonModule,
	],
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.css']
})
export class ShowDataComponent implements OnInit {

  public isvisible: WritableSignal<boolean> = signal(false);

  public flexibleObject?: FlexibleObject;
  
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

  private show() : void {
    this.flexibleObject = this.dataRepositoryService.getFlexibleObject();
    this.isvisible.set( (this.flexibleObject.hasContents()) ? true : false );
  }

}