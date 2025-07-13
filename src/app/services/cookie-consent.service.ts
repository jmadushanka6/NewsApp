import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

export interface CookiePreferences {
  analytics: boolean;
  marketing: boolean;
}

@Injectable({ providedIn: 'root' })
export class CookieConsentService {
  private readonly regionKey = 'user_region';
  private readonly prefsKey = 'cookie_preferences';
  private readonly consentTimestampKey = 'cookie_consent_timestamp';
  private readonly consentExpiryDays = 180; // ~6 months
  private showBannerSubject = new BehaviorSubject<boolean>(false);
  showBanner$ = this.showBannerSubject.asObservable();

  private preferredRegion?: string;

  constructor(private http: HttpClient) {
    this.init();
  }

  /** Initialize by checking region and preferences */
  private init(): void {
    const prefs = this.getPreferences();
    if (prefs && !this.isConsentExpired()) {
      return; // preferences exist and not expired
    }

    const region = localStorage.getItem(this.regionKey);
    if (region) {
      this.preferredRegion = region;
      if (this.consentRequired(region)) {
        this.showBannerSubject.next(true);
      }
    } else {
      this.detectRegion().subscribe(r => {
        this.preferredRegion = r;
        if (this.consentRequired(r)) {
          this.showBannerSubject.next(true);
        }
      });
    }
  }

  private detectRegion(): Observable<string> {
    return this.http.get<any>('https://ipapi.co/json/').pipe(
      tap(res => {
        localStorage.setItem(this.regionKey, res.country_code || '');
        if (res.region_code) {
          localStorage.setItem('user_region_state', res.region_code);
        }
      }),
      catchError(() => {
        localStorage.setItem(this.regionKey, '');
        return of('');
      })
    );
  }

  private consentRequired(region: string): boolean {
    const requiredRegions = ['EU', 'GB', 'BR', 'CA'];
    if (region === 'US') {
      // For US, only California (CA) has stricter requirements.
      const state = localStorage.getItem('user_region_state');
      return state === 'CA';
    }
    return requiredRegions.includes(region);
  }

  acceptAll(): void {
    this.savePreferences({ analytics: true, marketing: true });
  }

  rejectAll(): void {
    this.savePreferences({ analytics: false, marketing: false });
  }

  savePreferences(prefs: CookiePreferences): void {
    localStorage.setItem(this.prefsKey, JSON.stringify(prefs));
    localStorage.setItem(this.consentTimestampKey, Date.now().toString());
    this.showBannerSubject.next(false);
  }

  getPreferences(): CookiePreferences | null {
    const str = localStorage.getItem(this.prefsKey);
    if (!str) { return null; }
    try {
      return JSON.parse(str) as CookiePreferences;
    } catch {
      return null;
    }
  }

  private isConsentExpired(): boolean {
    const ts = localStorage.getItem(this.consentTimestampKey);
    if (!ts) { return true; }
    const diff = Date.now() - parseInt(ts, 10);
    return diff > this.consentExpiryDays * 24 * 60 * 60 * 1000;
  }
}
