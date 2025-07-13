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

  constructor(private news: NewsService) {}

  ngOnInit(): void {
    this.news
      .getNews()
      .pipe(first())
      .subscribe({
        next: all => {
          this.topStories = all.slice(0, 3);
          this.feed = all.slice(3);
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.error = true;
        }
      });
  }
}
