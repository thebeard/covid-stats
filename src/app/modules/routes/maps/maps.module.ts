import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

import { MapsRoutingModule } from './maps-routing.module';
import { MapsComponent } from './maps/maps.component';
import { MapContainerComponent } from './map-container/map-container.component';
import { environment } from '../../../../environments/environment';

@NgModule({
  declarations: [MapsComponent, MapContainerComponent],
  imports: [AgmCoreModule.forRoot({ apiKey: environment.googleApiKey }), CommonModule, MapsRoutingModule],
})
export class MapsModule {}
