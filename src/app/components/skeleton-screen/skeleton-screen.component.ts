import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-skeleton-screen',
  templateUrl: './skeleton-screen.component.html',
  styleUrls: ['./skeleton-screen.component.scss']
})
export class SkeletonScreenComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  /** Number of rows to render. Calculated from viewport height if not provided */
  @Input() rows = 0;
  /** Whether to render the top stories placeholder block */
  @Input() showTop = false;

  /** Reference to the feed container to measure its width */
  @ViewChild('feed', { static: true }) feedRef!: ElementRef<HTMLDivElement>;

  /** Calculated number of columns based on container width */
  private cols = 0;
  /** Array used to drive ngFor for card placeholders */
  placeholders: number[] = [];
  /** Placeholder array for top stories */
  topPlaceholders = Array(3);

  ngOnInit(): void {
    this.calculateRows();
  }

  ngAfterViewInit(): void {
    this.calculateCols();
    this.updatePlaceholders();
    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onResize);
  }

  /** Determine number of rows from viewport height */
  private calculateRows(): void {
    if (!this.rows) {
      const height = window.innerHeight || 800;
      this.rows = Math.max(1, Math.floor(height / 200));
    }
  }

  /** Determine number of columns based on container width */
  private calculateCols(): void {
    const width = this.feedRef?.nativeElement.clientWidth || window.innerWidth;
    const minCardWidth = 250; // matches news-feed min width
    this.cols = Math.max(1, Math.floor(width / minCardWidth));
  }

  /** Update placeholder array to match rows * cols */
  private updatePlaceholders(): void {
    const count = this.rows * this.cols;
    this.placeholders = Array(count).fill(0);
  }

  private onResize = () => {
    this.calculateRows();
    this.calculateCols();
    this.updatePlaceholders();
  };

  trackByIndex(index: number): number {
    return index;
  }
}
