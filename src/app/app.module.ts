import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { TakeInputComponent } from './take-input/take-input.component';
import { HeaderComponent } from './header/header.component';
// import { DisplayWeatherComponent } from './display-weather/display-weather.component';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
// import { MapComponent } from './map/map.component';

import { MatInputModule, MatCardModule, MatButtonModule, MatDividerModule, MatListModule, MatToolbarModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material';

import { AppComponent } from './app.component';

// import { WeatherService } from './weather.service';


@NgModule({
  declarations: [
    AppComponent,
    TakeInputComponent,
    HeaderComponent
    // DisplayWeatherComponent,
    // MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCpQZxTXBzu1wIgq3Urm9hGmA0H8GEO2b0',
    }),
    AgmDirectionModule,
    HttpClientModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class PizzaPartyAppModule { }
