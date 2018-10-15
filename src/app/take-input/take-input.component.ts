import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WeatherService } from '../weather.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-take-input',
  templateUrl: './take-input.component.html',
  styleUrls: ['./take-input.component.css']
})
export class TakeInputComponent {
  originCity = '';
  destinationCity = '';
  outputWeather = [];
  mapMarkers = [];
  private outputSub: Subscription;
  private markersSub: Subscription;
  dir = [];
  lat = 42.8864;
  lng = -78.8784;
  progBar = 1;
  private directionSub: Subscription;

  constructor(public weatherService: WeatherService) {}

  onGetWeather(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.progBar = 0;
    this.weatherService.giveInput(form.value.originCity, form.value.destinationCity);
    this.dir = this.weatherService.showOnMap();
    this.directionSub = this.weatherService.getDirectionUpdateListener()
      .subscribe((directions: any[]) => {
        this.dir = directions;
      });

    this.weatherService.getWeather();

    this.markersSub = this.weatherService.getMarkersUpdateListener()
      .subscribe((markers: any[]) => {
        this.mapMarkers = markers;
      });

    this.outputSub = this.weatherService.getWeatherUpdateListener()
      .subscribe((weatherArray: any[]) => {
        this.outputWeather = weatherArray;
        this.progBar = 1;
      });
  }
}
