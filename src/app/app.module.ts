import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AppInitializer } from './app-initializer';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, BrowserAnimationsModule, BrowserModule, HttpClientModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: AppInitializer,
      multi: true,
      deps: [HttpClient]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
