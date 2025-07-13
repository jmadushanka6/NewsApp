import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieConsentService, CookiePreferences } from '../../services/cookie-consent.service';

@Component({
  selector: 'app-cookie-settings',
  templateUrl: './cookie-settings.component.html',
  styleUrls: ['./cookie-settings.component.scss']
})
export class CookieSettingsComponent {
  prefs: CookiePreferences = { analytics: false, marketing: false };

  constructor(private consent: CookieConsentService, private router: Router) {
    const saved = this.consent.getPreferences();
    if (saved) {
      this.prefs = { ...saved };
    }
  }

  save(): void {
    this.consent.savePreferences(this.prefs);
    this.router.navigate(['/']);
  }
}
