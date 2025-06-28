import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isMenuOpen = false;
  isHidden = false;
  private lastScrollY = 0;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
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
