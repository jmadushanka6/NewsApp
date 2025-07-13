import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService, News } from '../../services/news.service';
import { Observable, of, first } from 'rxjs';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  news$?: Observable<News>;
  loading = false;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    const stateNews = this.router.getCurrentNavigation()?.extras.state?.['article'] as News | undefined;
    const id = this.route.snapshot.paramMap.get('id');

    if (stateNews) {
      this.news$ = of(stateNews);
    } else if (id) {
      this.loading = true;
      this.news$ = this.newsService.getNewsById(id);
      this.news$.pipe(first()).subscribe({
        next: () => (this.loading = false),
        error: () => {
          this.loading = false;
          this.error = true;
        }
      });
    } else {
      this.router.navigate(['/']);
    }
  }
}
