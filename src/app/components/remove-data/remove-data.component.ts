import { Component, OnInit, inject, WritableSignal, signal } from '@angular/core';
import { DataRepositoryService } from 'src/app/services/data-repository.service';
import { FlexibleObject } from 'src/app/flexible-object/FlexibleObject';

@Component({
  selector: 'app-remove-data',
  templateUrl: './remove-data.component.html',
  styleUrls: ['./remove-data.component.scss']
})

export class RemoveDataComponent implements OnInit {

  protected propertyNames: WritableSignal<string[] | undefined> = signal([]);
  protected types: WritableSignal<string[] | undefined> = signal([]);

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