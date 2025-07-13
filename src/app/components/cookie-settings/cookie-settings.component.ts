import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieConsentService } from '../../services/cookie-consent.service';

@Component({
  selector: 'app-cookie-settings',
  templateUrl: './cookie-settings.component.html',
  styleUrls: ['./cookie-settings.component.scss']
})
export class CookieSettingsComponent {
  analytics = true;
  marketing = true;

  constructor(private consent: CookieConsentService, private router: Router) {
    const prefs = consent.getPreferences();
    if (prefs) {
      this.analytics = prefs.analytics;
      this.marketing = prefs.marketing;
    }
  }

  save(): void {
    this.consent.savePreferences({ analytics: this.analytics, marketing: this.marketing });
    this.router.navigate(['/']);
  }
}
