import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { DataRepository } from '../../services/data-repository';
import { FlexibleObject } from '../../flexible-object/FlexibleObject';
import { JsonPipe } from '@angular/common';

@Component({
	imports: [
		JsonPipe
	],
  selector: 'app-show-data',
  templateUrl: './show-data.html',
  styleUrls: ['./show-data.scss']
})
export class ShowData implements OnInit {

  protected isvisible: WritableSignal<boolean> = signal(false);

  protected flexibleObject: WritableSignal<FlexibleObject | undefined> = signal(undefined);
  
  private dataRepositoryService = inject(DataRepository);

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
    this.flexibleObject.set(undefined);
    this.flexibleObject.set(this.dataRepositoryService.getFlexibleObject());

    if(this.flexibleObject()) {      
      this.isvisible.set(this.flexibleObject()!.hasContents() ? true : false);
    }    
  }

}