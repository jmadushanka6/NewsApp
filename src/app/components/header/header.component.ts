import { Component, HostListener } from '@angular/core';

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
  private lastScrollY = 0;

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
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
