import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styles: ['h3 { margin-top: 2em;}']
})
export class AboutComponent {
  countries = ['USA', 'Italy', 'Span', 'Germany', 'Iran', 'France'];
  infectedCountries = 202;
}
