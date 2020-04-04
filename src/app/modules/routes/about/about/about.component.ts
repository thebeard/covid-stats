import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styles: ['h3 { margin-top: 2em; }'],
})
export class AboutComponent {
  countries = ['USA', 'Spain', 'Italy', 'Germany', 'France', 'Iran', 'United Kingdom'];
  infectedCountries = 205;
}
