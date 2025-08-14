import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { News, NewsService } from '../../services/news.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-vienna-news',
  templateUrl: './vienna-news.component.html',
  styleUrls: ['./vienna-news.component.scss']
})
export class ViennaNewsComponent implements OnInit {
  topStories: News[] = [];
  feed: News[] = [];
  loading = true;
  error = false;

  isMobile = window.innerWidth <= 768;
  taggedFeeds: { [key: string]: News[] } = {};
  tagSections = [
    { label: 'Local', route: 'region' },
    { label: 'Sport', route: 'sport' },
    { label: 'Business', route: 'business' }
  ];

  itemsPerPageOptions = [5, 10, 15, 30];
  itemsPerPage = this.itemsPerPageOptions[1];
  currentPage = 1;
  pageCursors: (Date | null)[] = [null];
  totalNewsCount = 0;
  totalPages = 1;

  constructor(private news: NewsService, private router: Router) {}

  ngOnInit(): void {
    if (this.isMobile) {
      const limit = this.calculateMobileLimit();
      this.loadTopStories(limit);
      this.loadTaggedSections(limit);
    } else {
      this.itemsPerPage = this.calculateDesktopItemsPerPage();
      this.loadTopStories();
      this.loadTotalNewsCount();
      this.loadPage(1);
    }
  }

  private loadTotalNewsCount() {
    const cached = localStorage.getItem('newsCount');
    if (cached) {
      this.totalNewsCount = +cached;
      this.updateTotalPages();
    } else {
      this.news
        .getNewsCount()
        .pipe(first())
        .subscribe({
          next: count => {
            this.totalNewsCount = count;
            localStorage.setItem('newsCount', count.toString());
            this.updateTotalPages();
          },
          error: () => (this.error = true)
        });
    }
  }

  private updateTotalPages() {
    this.totalPages = Math.max(1, Math.ceil(this.totalNewsCount / this.itemsPerPage));
  }

  private loadTopStories(limit: number = 5) {
    this.news
      .getTopNews(limit)
      .pipe(first())
      .subscribe({
        next: stories => {
          this.topStories = stories;
          if (this.isMobile) {
            this.loading = false;
          }
        },
        error: () => {
          this.error = true;
          this.loading = false;
        }
      });
  }

  private loadTaggedSections(limit: number) {
    this.tagSections.forEach(sec => {
      this.news
        .getNewsPageByTag(sec.route, limit, null)
        .pipe(first())
        .subscribe({
          next: list => (this.taggedFeeds[sec.route] = list),
          error: () => (this.error = true)
        });
    });
  }

  private calculateMobileLimit(): number {
    const width = window.innerWidth;
    if (width < 480) {
      return 3;
    }
    if (width < 768) {
      return 5;
    }
    return 7;
  }

  private calculateDesktopItemsPerPage(): number {
    const width = window.innerWidth;
    if (width < 992) {
      return 10;
    }
    return 15;
  }

  openCategory(route: string) {
    this.router.navigate([route]);
  }

  private loadPage(page: number) {
    const cursor = this.pageCursors[page - 1] ?? null;
    this.loading = true;
    this.news
      .getNewsPage(this.itemsPerPage, cursor)
      .pipe(first())
      .subscribe({
        next: list => {
          this.feed = list;
          this.currentPage = page;
          this.updateTotalPages();
          const last = list[list.length - 1];
          if (last) {
            this.pageCursors[page] = last.created_at;
          }
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.error = true;
        }
      });
  }


  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.loadPage(this.currentPage + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.loadPage(this.currentPage - 1);
    }
  }

  onPerPageChange(val: number) {
    this.itemsPerPage = val;
    this.updateTotalPages();
    this.currentPage = 1;
    this.pageCursors = [null];
    this.loadPage(1);
  }
}
