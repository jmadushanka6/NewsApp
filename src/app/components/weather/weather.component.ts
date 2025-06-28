import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  forecast: any[] = [];
  locationError = false;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => this.loadForecast(pos.coords.latitude, pos.coords.longitude),
        () => (this.locationError = true)
      );
    } else {
      this.locationError = true;
    }
  }

  private loadForecast(lat: number, lon: number): void {
    this.weatherService.getForecast(lat, lon).subscribe(data => {
      this.forecast = (data.forecast && data.forecast.forecastday) || [];
    });
  }

  iconUrl(path: string): string {
    return path.startsWith('http') ? path : 'https:' + path;
  }
}
