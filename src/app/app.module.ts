import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './modules/state/layout';
import { LoaderModule } from './modules/state/loader';
import { SidebarModule } from './modules/ui/sidebar';

import { AppComponent } from './app.component';
import { AppInitializer } from './app-initializer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    LayoutModule,
    LoaderModule,
    MatIconModule,
    MatProgressBarModule,
    MatSidenavModule,
    SidebarModule
  ],
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
