import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexibleObjectDemoModule } from './components/flexible-object-demo.module';
import { AppComponent } from './app.component';
import { DataRepositoryService } from './services/data-repository.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FlexibleObjectDemoModule
  ],
  providers: [
    DataRepositoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
