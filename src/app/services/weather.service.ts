import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  constructor(private http: HttpClient) {}

  getForecast(lat: number, lon: number): Observable<any> {
    const params = {
      key: environment.weatherApi.apiKey,
      q: `${lat},${lon}`,
      days: '6',
      aqi: 'no',
      alerts: 'no'
    };
    return this.http.get('https://api.weatherapi.com/v1/forecast.json', { params });
  }
}
