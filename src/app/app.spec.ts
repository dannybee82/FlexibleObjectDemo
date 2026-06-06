import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { beforeEach, describe, expect, it } from 'vitest';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [],
    imports: [App]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'FlexibleObjectDemo'`, () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect((app as any).title()).toEqual('FlexibleObjectDemo');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('FlexibleObjectDemo app is running!');
  // });  

});