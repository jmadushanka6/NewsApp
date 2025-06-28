import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  constructor(private http: HttpClient) {}

  getForecast(lat: number, lon: number): Observable<any> {
    const params = {
      lat: lat.toString(),
      lon: lon.toString(),
      appid: environment.openWeather.apiKey
    };
    const location$ = this.http.get(
      'https://api.openweathermap.org/geo/1.0/reverse',
      {
        params: { ...params, limit: '1' }
      }
    );
    const forecast$ = this.http.get(
      'https://api.openweathermap.org/data/2.5/onecall',
      {
        params: { ...params, units: 'metric', exclude: 'minutely,hourly,alerts' }
      }
    );
    return forkJoin([location$, forecast$]).pipe(
      map(([loc, fc]) => ({ location: Array.isArray(loc) ? loc[0] : null, forecast: fc }))
    );
  }
}
