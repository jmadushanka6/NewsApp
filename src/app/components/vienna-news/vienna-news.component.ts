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

  constructor(private news: NewsService) {}

  ngOnInit(): void {
    this.news
      .getNews()
      .pipe(first())
      .subscribe({
        next: all => {
          const topTag = 'top';
          this.topStories = all.filter(a => a.tag?.toLowerCase() === topTag);
          this.feed = all
            .filter(a => a.tag?.toLowerCase() !== topTag)
            .sort((a, b) => b.created_at.getTime() - a.created_at.getTime());
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.error = true;
        }
      });
  }

  get pagedFeed(): News[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.feed.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.feed.length / this.itemsPerPage) || 1;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  onPerPageChange(val: number) {
    this.itemsPerPage = val;
    this.currentPage = 1;
  }
}
