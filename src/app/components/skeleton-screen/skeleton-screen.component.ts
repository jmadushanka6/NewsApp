import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton-screen',
  templateUrl: './skeleton-screen.component.html',
  styleUrls: ['./skeleton-screen.component.scss']
})
export class SkeletonScreenComponent implements OnInit {
  @Input() rows = 0;

  ngOnInit(): void {
    if (!this.rows) {
      const height = window.innerHeight || 800;
      this.rows = Math.max(1, Math.floor(height / 200));
    }
  }

  trackByIndex(index: number): number {
    return index;
  }
}
