import { Component } from '@angular/core';
import { AddDataComponent } from 'src/app/components/add-data/add-data.component';
import { ShowDataComponent } from 'src/app/components/show-data/show-data.component';
import { RemoveDataComponent } from 'src/app/components/remove-data/remove-data.component';

@Component({
	standalone: true,
	imports: [
		AddDataComponent,
		ShowDataComponent,
		RemoveDataComponent,
	],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FlexibleObjectDemo';
}