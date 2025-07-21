import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News, NewsService } from '../../services/news.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-tagged-news',
  templateUrl: './tagged-news.component.html',
  styleUrls: ['./tagged-news.component.scss']
})
export class TaggedNewsComponent implements OnInit {
  tag = '';
  feed: News[] = [];
  loading = true;
  error = false;

  itemsPerPageOptions = [5, 10, 15, 30];
  itemsPerPage = this.itemsPerPageOptions[1];
  currentPage = 1;
  pageCursors: (Date | null)[] = [null];
  hasMore = false;
  totalNewsCount = 0;
  totalPages = 1;

  constructor(private route: ActivatedRoute, private news: NewsService) {}

  ngOnInit(): void {
    this.tag = this.route.snapshot.data['tag'];
    this.loadTotalNewsCount();
    this.loadPage(1);
  }

  private loadTotalNewsCount() {
    const cacheKey = `newsCount-${this.tag}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      this.totalNewsCount = +cached;
      this.updateTotalPages();
    } else {
      this.news
        .getNewsCountByTag(this.tag)
        .pipe(first())
        .subscribe({
          next: count => {
            this.totalNewsCount = count;
            localStorage.setItem(cacheKey, count.toString());
            this.updateTotalPages();
          },
          error: () => (this.error = true)
        });
    }
  }

  private updateTotalPages() {
    this.totalPages = Math.max(1, Math.ceil(this.totalNewsCount / this.itemsPerPage));
    this.hasMore = this.currentPage < this.totalPages;
  }

  private loadPage(page: number) {
    const cursor = this.pageCursors[page - 1] ?? null;
    this.loading = true;
    this.news
      .getNewsPageByTag(this.tag, this.itemsPerPage, cursor)
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
    this.updateTotalPages();
    this.currentPage = 1;
    this.pageCursors = [null];
    this.loadPage(1);
  }
}
