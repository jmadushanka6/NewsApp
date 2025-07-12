import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  forecast: any[] = [];
  location = '';
  hasLocation = true;

  private readonly cacheKey = 'weatherCache';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => this.loadForecast(pos.coords.latitude, pos.coords.longitude),
        () => (this.hasLocation = false)
      );
    } else {
      this.hasLocation = false;
    }
  }

  private loadForecast(lat: number, lon: number): void {
    const today = new Date().toISOString().split('T')[0];
    const cachedRaw = localStorage.getItem(this.cacheKey);
    if (cachedRaw) {
      try {
        const cached = JSON.parse(cachedRaw);
        if (
          cached.date === today &&
          cached.lat === lat &&
          cached.lon === lon &&
          Array.isArray(cached.forecast)
        ) {
          this.location = cached.location || '';
          this.forecast = cached.forecast;
          return;
        }
      } catch {
        // ignore corrupted cache
      }
    }

    this.weatherService.getForecast(lat, lon).subscribe(data => {
      if (data.location) {
        const loc = data.location;
        this.location = [loc.name, loc.region || loc.country]
          .filter(Boolean)
          .join(', ');
      }
      if (data.forecast && data.forecast.forecastday) {
        this.forecast = data.forecast.forecastday;
        localStorage.setItem(
          this.cacheKey,
          JSON.stringify({
            date: today,
            lat,
            lon,
            location: this.location,
            forecast: this.forecast,
          })
        );
      }
    });
  }

  iconUrl(icon: string): string {
    return icon.startsWith('//') ? `https:${icon}` : icon;
  }
}
