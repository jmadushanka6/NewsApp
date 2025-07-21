import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { News, NewsService } from '../../services/news.service';
import { first, Subscription } from 'rxjs';

@Component({
  selector: 'app-vienna-news',
  templateUrl: './vienna-news.component.html',
  styleUrls: ['./vienna-news.component.scss']
})
export class ViennaNewsComponent implements OnInit, OnDestroy {
  topStories: News[] = [];
  feed: News[] = [];
  paginatedFeed: News[] = [];
  pageSizes = [5, 10, 15, 30];
  itemsPerPage = this.pageSizes[0];
  currentPage = 1;
  loading = true;
  error = false;

  tag: string | null = null;
  pageTitle = 'Vienna Local News';
  private sub?: Subscription;

  constructor(private news: NewsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe(params => {
      this.tag = params.get('tag');
      this.pageTitle = this.tag
        ? `${this.tag.charAt(0).toUpperCase()}${this.tag.slice(1)} News`
        : 'Vienna Local News';
      this.loadArticles();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private loadArticles(): void {
    this.loading = true;
    this.news
      .getNews()
      .pipe(first())
      .subscribe({
        next: all => {
          if (this.tag) {
            this.topStories = [];
            this.feed = all
              .filter(a => a.tags?.includes(this.tag!))
              .sort(
                (a, b) => b.created_at.getTime() - a.created_at.getTime()
              );
          } else {
            this.topStories = all.filter(a => a.tags?.includes('top'));
            this.feed = all
              .filter(a => !a.tags?.includes('top'))
              .sort(
                (a, b) => b.created_at.getTime() - a.created_at.getTime()
              );
          }
          this.currentPage = 1;
          this.updatePagination();
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.error = true;
        }
      });
  }

  get totalPages(): number {
    return Math.ceil(this.feed.length / this.itemsPerPage) || 1;
  }

  updatePagination(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedFeed = this.feed.slice(start, end);
  }

  setItemsPerPage(size: number): void {
    this.itemsPerPage = size;
    this.currentPage = 1;
    this.updatePagination();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
}
