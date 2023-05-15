import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexibleObjectDemoModule } from './components/flexible-object-demo.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FlexibleObjectDemoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
