import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';
import { NewsService } from './services/news.service';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { TopStoriesComponent } from './components/top-stories/top-stories.component';
import { ViennaNewsComponent } from './components/vienna-news/vienna-news.component';
import { WeatherComponent } from './components/weather/weather.component';
import { MailmanLoaderComponent } from './components/mailman-loader/mailman-loader.component';
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner.component';
import { CookieSettingsComponent } from './components/cookie-settings/cookie-settings.component';
import { CookiePolicyComponent } from './components/cookie-policy/cookie-policy.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NewsDetailComponent,
    NewsCardComponent,
    TopStoriesComponent,
    ViennaNewsComponent,
    WeatherComponent,
    MailmanLoaderComponent,
    CookieBannerComponent,
    CookieSettingsComponent,
    CookiePolicyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    RouterModule.forRoot([
      { path: '', component: ViennaNewsComponent, pathMatch: 'full' },
      { path: 'category/:tag', component: ViennaNewsComponent },
      { path: 'cookie-settings', component: CookieSettingsComponent },
      { path: 'cookie-policy', component: CookiePolicyComponent },
      { path: ':id', component: NewsDetailComponent }
    ])
  ],
  providers: [NewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
