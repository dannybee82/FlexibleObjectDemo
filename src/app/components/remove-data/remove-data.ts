import { Component, OnInit, inject, WritableSignal, signal } from '@angular/core';
import { DataRepository } from '../../services/data-repository';
import { FlexibleObject } from '../../flexible-object/FlexibleObject';

@Component({
  selector: 'app-remove-data',
  templateUrl: './remove-data.html',
  styleUrls: ['./remove-data.scss']
})

export class RemoveData implements OnInit {

  protected propertyNames: WritableSignal<string[] | undefined> = signal([]);
  protected types: WritableSignal<string[] | undefined> = signal([]);

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

  remove(index: number): void {
    if(this.propertyNames()) {
      this.dataRepositoryService.removeProperty(this.propertyNames()![index]);  
    }    
  }

  private getTypes(): void {
    if(this.propertyNames()) {
      this.propertyNames()!.forEach(item => {
        this.types()?.push( this.dataRepositoryService.getTypeOfProperty(item) ?? "Unknown" );
      });
    }
  }

  private show(): void {
    this.propertyNames.set([]);
    this.types.set([]);

    let flexibleObject: FlexibleObject = this.dataRepositoryService.getFlexibleObject();
    this.propertyNames.set(flexibleObject.getPropertyNames());
    this.getTypes();
  }

}