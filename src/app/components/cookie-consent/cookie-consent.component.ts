import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieConsentService } from '../../services/cookie-consent.service';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss']
})
export class CookieConsentComponent {
  constructor(
    public consent: CookieConsentService,
    private router: Router
  ) {}

  acceptAll(): void {
    this.consent.acceptAll();
  }

  rejectAll(): void {
    this.consent.rejectAll();
  }

  customize(): void {
    this.router.navigate(['/cookie-settings']);
  }
}
