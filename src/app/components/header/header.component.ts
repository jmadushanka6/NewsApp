import { Component, HostListener } from '@angular/core';

type ThemeMode = 'light' | 'dark';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isMenuOpen = false;
  isHidden = false;
  showSearch = false;
  searchTerm = '';
  suggestions: string[] = [];
  isDarkTheme = false;
  private lastScrollY = 0;

  constructor() {
    this.initializeTheme();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.searchTerm = '';
      this.suggestions = [];
    }
  }

  onSearch(value: string): void {
    this.searchTerm = value;
    this.updateSuggestions();
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.applyTheme(this.isDarkTheme ? 'dark' : 'light');
  }

  private initializeTheme(): void {
    const storedTheme = localStorage.getItem('theme') as ThemeMode | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = storedTheme ?? (prefersDark ? 'dark' : 'light');

    this.isDarkTheme = theme === 'dark';
    this.applyTheme(theme);
  }

  private applyTheme(theme: ThemeMode): void {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  private updateSuggestions(): void {
    if (!this.searchTerm) {
      this.suggestions = [];
      return;
    }
    const titles = Array.from(
      document.querySelectorAll('h1, h2, h3.title')
    ).map(el => el.textContent?.trim() || '');
    const query = this.searchTerm.toLowerCase();
    this.suggestions = titles
      .filter(t => t.toLowerCase().includes(query))
      .slice(0, 5);
  }

  scrollTo(title: string): void {
    const el = Array.from(
      document.querySelectorAll('h1, h2, h3.title')
    ).find(e => e.textContent?.trim() === title) as HTMLElement | undefined;
    if (el) {
      const clickable = el.closest('.news-card, .story') as HTMLElement | null;
      if (clickable) {
        clickable.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    this.toggleSearch();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const currentY = window.scrollY;
    if (currentY > this.lastScrollY && currentY > 50) {
      this.isHidden = true;
    } else {
      this.isHidden = false;
    }
    this.lastScrollY = currentY;
  }
}
