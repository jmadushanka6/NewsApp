import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap, shareReplay } from 'rxjs/operators';
import * as yaml from 'js-yaml';

interface WeatherConfig {
  openWeather: {
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
      switchMap(config => {
        const params = {
          lat: lat.toString(),
          lon: lon.toString(),
          appid: config.openWeather.apiKey
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
      })
    );
  }
}
