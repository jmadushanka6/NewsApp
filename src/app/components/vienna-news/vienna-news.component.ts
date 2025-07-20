import { Component, OnInit } from '@angular/core';
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

  itemsPerPageOptions = [5, 10, 15, 30];
  itemsPerPage = this.itemsPerPageOptions[1];
  currentPage = 1;
  pageCursors: (Date | null)[] = [null];
  hasMore = false;

  constructor(private news: NewsService) {}

  ngOnInit(): void {
    this.loadTopStories();
    this.loadPage(1);
  }

  private loadTopStories() {
    this.news
      .getTopNews()
      .pipe(first())
      .subscribe({
        next: stories => (this.topStories = stories),
        error: () => (this.error = true)
      });
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
          this.hasMore = list.length === this.itemsPerPage;
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

  get totalPages(): number {
    return this.currentPage + (this.hasMore ? 1 : 0);
  }

  nextPage(): void {
    if (this.hasMore) {
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
    this.currentPage = 1;
    this.pageCursors = [null];
    this.loadPage(1);
  }
}
