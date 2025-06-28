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
    this.weatherService.getForecast(lat, lon).subscribe(data => {
      if (data.location) {
        const loc = data.location;
        this.location = [loc.name, loc.region || loc.country]
          .filter(Boolean)
          .join(', ');
      }
      if (data.forecast && data.forecast.forecastday) {
        this.forecast = data.forecast.forecastday;
      }
    });
  }

  iconUrl(icon: string): string {
    return icon.startsWith('//') ? `https:${icon}` : icon;
  }
}
