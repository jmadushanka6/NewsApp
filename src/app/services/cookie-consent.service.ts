import { Injectable } from '@angular/core';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

@Injectable({ providedIn: 'root' })
export class CookieConsentService {
  private regionKey = 'userRegion';
  private prefsKey = 'cookiePrefs';
  region: string | null = null;
  preferences: CookiePreferences | null = null;

  constructor() {
    this.load();
  }

  private load(): void {
    this.region = localStorage.getItem(this.regionKey);
    const p = localStorage.getItem(this.prefsKey);
    this.preferences = p ? (JSON.parse(p) as CookiePreferences) : null;
    if (!this.region) {
      this.region = this.detectRegion();
      localStorage.setItem(this.regionKey, this.region);
    }
    if (this.preferences && this.isExpired(this.preferences)) {
      this.preferences = null;
      localStorage.removeItem(this.prefsKey);
    }
  }

  private isExpired(prefs: CookiePreferences): boolean {
    const SIX_MONTHS = 1000 * 60 * 60 * 24 * 30 * 6;
    return Date.now() - prefs.timestamp > SIX_MONTHS;
  }

  detectRegion(): string {
    try {
      const locale = navigator.language || '';
      const region = new Intl.Locale(locale).region?.toUpperCase() || '';
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      const eu = [
        'AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE'
      ];
      if (region === 'BR') {
        return 'brazil';
      }
      if (region === 'GB' || region === 'UK') {
        return 'uk';
      }
      if (region === 'US') {
        if (tz.includes('Los_Angeles')) {
          return 'california';
        }
        return 'us';
      }
      if (eu.includes(region)) {
        return 'eu';
      }
    } catch (e) {
      // ignore
    }
    return 'other';
  }

  needsConsent(): boolean {
    return (
      this.region === 'eu' ||
      this.region === 'uk' ||
      this.region === 'brazil' ||
      this.region === 'california'
    );
  }

  hasConsent(): boolean {
    return this.preferences !== null;
  }

  savePreferences(prefs: { analytics: boolean; marketing: boolean }): void {
    this.preferences = {
      essential: true,
      analytics: prefs.analytics,
      marketing: prefs.marketing,
      timestamp: Date.now(),
    };
    localStorage.setItem(this.prefsKey, JSON.stringify(this.preferences));
  }

  getPreferences(): CookiePreferences | null {
    return this.preferences;
  }
}
