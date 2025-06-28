import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap, shareReplay } from 'rxjs/operators';
import * as yaml from 'js-yaml';

interface WeatherConfig {
  weatherApi: {
    apiKey: string;
  };
}

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private config$?: Observable<WeatherConfig>;

  constructor(private http: HttpClient) {}

  private loadConfig(): Observable<WeatherConfig> {
    if (!this.config$) {
      this.config$ = this.http
        .get('assets/config.yml', { responseType: 'text' })
        .pipe(
          map(text => yaml.load(text) as WeatherConfig),
          shareReplay(1)
        );
    }
    return this.config$;
  }

  getForecast(lat: number, lon: number): Observable<any> {
    return this.loadConfig().pipe(
      switchMap(config =>
        this.http.get('http://api.weatherapi.com/v1/forecast.json', {
          params: {
            key: config.weatherApi.apiKey,
            q: `${lat},${lon}`,
            days: '6',
            aqi: 'no',
            alerts: 'no'
          }
        })
      )
    );
  }
}
