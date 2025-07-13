import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
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
import { LocalNewsDetailComponent } from './components/local-news-detail/local-news-detail.component';
import { WeatherComponent } from './components/weather/weather.component';
import { MailmanLoaderComponent } from './components/mailman-loader/mailman-loader.component';
import { CookieConsentComponent } from './components/cookie-consent/cookie-consent.component';
import { CookieSettingsComponent } from './components/cookie-settings/cookie-settings.component';
import { CookiePolicyComponent } from './components/cookie-policy/cookie-policy.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NewsDetailComponent,
    NewsCardComponent,
    TopStoriesComponent,
    ViennaNewsComponent,
    LocalNewsDetailComponent,
    WeatherComponent,
    MailmanLoaderComponent,
    CookieConsentComponent,
    CookieSettingsComponent,
    CookiePolicyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'local-news/vienna', pathMatch: 'full' },
      { path: 'news/:id', component: NewsDetailComponent },
      { path: 'local-news/vienna', component: ViennaNewsComponent },
      { path: 'local-news/vienna/:id', component: LocalNewsDetailComponent },
      { path: 'cookie-settings', component: CookieSettingsComponent },
      { path: 'cookie-policy', component: CookiePolicyComponent }
    ])
  ],
  providers: [NewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
