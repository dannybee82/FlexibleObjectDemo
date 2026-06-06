import { Component, signal, WritableSignal, ChangeDetectionStrategy } from '@angular/core';
import { AddData } from './components/add-data/add-data';
import { ShowData } from './components/show-data/show-data';
import { RemoveData } from './components/remove-data/remove-data';

@Component({
	imports: [
		AddData,
		ShowData,
		RemoveData,
	],
  selector: 'app-root',
  templateUrl: './app.html'
})
export class App {
	protected title: WritableSignal<string> = signal('FlexibleObjectDemo');
}