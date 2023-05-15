import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//Services.
import { DataRepositoryService } from '../services/data-repository.service';

//Components.
import { AddDataComponent } from './add-data/add-data.component';
import { ShowDataComponent } from './show-data/show-data.component';
import { RemoveDataComponent } from './remove-data/remove-data.component';

@NgModule({
  declarations: [
    AddDataComponent,
    ShowDataComponent,
    RemoveDataComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    DataRepositoryService
  ],
  exports: [
    AddDataComponent,
    ShowDataComponent,
    RemoveDataComponent
  ]
})
export class FlexibleObjectDemoModule { }
