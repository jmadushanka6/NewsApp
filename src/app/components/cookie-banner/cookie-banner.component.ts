import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieConsentService } from '../../services/cookie-consent.service';

@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.scss']
})
export class CookieBannerComponent {
  constructor(public consent: CookieConsentService, private router: Router) {}

  acceptAll(): void {
    this.consent.savePreferences({ analytics: true, marketing: true });
  }

  rejectAll(): void {
    this.consent.savePreferences({ analytics: false, marketing: false });
  }

  customize(): void {
    this.router.navigate(['/cookie-settings']);
  }
}
