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
  paginatedFeed: News[] = [];
  pageSizes = [5, 10, 15, 30];
  itemsPerPage = this.pageSizes[0];
  currentPage = 1;
  loading = true;
  error = false;

  constructor(private news: NewsService) {}

  ngOnInit(): void {
    this.news
      .getNews()
      .pipe(first())
      .subscribe({
        next: all => {
          this.topStories = all.filter(a => a.tags?.includes('top'));
          this.feed = all
            .filter(a => !a.tags?.includes('top'))
            .sort((a, b) => b.created_at.getTime() - a.created_at.getTime());
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
