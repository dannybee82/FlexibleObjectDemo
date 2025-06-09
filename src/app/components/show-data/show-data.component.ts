import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { DataRepositoryService } from 'src/app/services/data-repository.service';
import { FlexibleObject } from 'src/app/flexible-object/FlexibleObject';
import { JsonPipe } from '@angular/common';

@Component({
	imports: [
		JsonPipe
	],
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.scss']
})
export class ShowDataComponent implements OnInit {

  protected isvisible: WritableSignal<boolean> = signal(false);

  protected flexibleObject: WritableSignal<FlexibleObject | undefined> = signal(undefined);
  
  private dataRepositoryService = inject(DataRepositoryService);

  ngOnInit(): void {
    this.dataRepositoryService.getUpdateView().subscribe({
      next: (result) => {
        if(result) {
          this.show();
        }
      }
    });
  }

  private show(): void {
    this.flexibleObject.set(this.dataRepositoryService.getFlexibleObject());

    if(this.flexibleObject()) {      
      this.isvisible.set( (this.flexibleObject()!.hasContents()) ? true : false );
    }    
  }

}