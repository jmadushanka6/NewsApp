import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService, News } from '../../services/news.service';
import { Observable, first, startWith } from 'rxjs';

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
    const id = stateNews?.id ?? this.route.snapshot.paramMap.get('id') ?? undefined;

    if (!id) {
      this.router.navigate(['/']);
      return;
    }

    this.newsService.incrementNewsViews(id).catch(error => {
      console.error('Failed to increment news views', error);
    });

    const fetch$ = this.newsService.getNewsById(id);
    this.news$ = stateNews
      ? fetch$.pipe(startWith({ ...stateNews, views: (stateNews.views ?? 0) + 1 }))
      : fetch$;

    this.loading = true;
    fetch$.pipe(first()).subscribe({
      next: () => (this.loading = false),
      error: () => {
        this.loading = false;
        this.error = true;
      }
    });
  }
}
