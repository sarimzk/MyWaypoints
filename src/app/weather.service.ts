import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { SubjectSubscriber } from 'rxjs/internal/Subject';

@Injectable({providedIn: 'root'})

export class WeatherService {
  private weatherArray = [];
  private directions = [];
  private markers = [];

  private weatherReceived = new Subject();
  private directionReceived = new Subject();
  private markersReceived = new Subject();

  constructor(private http: HttpClient) {}

  getWeather() {
    setTimeout(() => this.http.get<any[]>('http://localhost:3000/api/dispWeather')
      .subscribe(wA => {
        this.weatherArray = wA[0];
        this.markers = wA[1];
        console.log(wA);
        this.weatherReceived.next([...this.weatherArray]);
        this.markersReceived.next([...this.markers]);
      }), 5000);
  }

  getWeatherUpdateListener() {
    return this.weatherReceived.asObservable();
  }

  getMarkersUpdateListener() {
    return this.markersReceived.asObservable();
  }

  giveInput(or: string, de: string) {
    this.directions[0] = or;
    this.directions[1] = de;
    this.http.post<any[]>('http://localhost:3000/api/dispWeather', this.directions)
      .subscribe(responseData => {
        console.log(responseData);
      });


    this.directionReceived.next([...this.directions]);
  }

  getDirectionUpdateListener() {
    return this.directionReceived.asObservable();
  }

  showOnMap() {
    return [...this.directions];
  }
}
