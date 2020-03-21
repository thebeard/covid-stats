import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<main><router-outlet></router-outlet></main>',
  styles: ['main { max-width: 1300px; margin: 0 auto; }']
})
export class AppComponent {}
