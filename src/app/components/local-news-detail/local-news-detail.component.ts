import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalNewsArticle, LocalNewsService } from '../../services/local-news.service';
import { Observable, of, first } from 'rxjs';

@Component({
  selector: 'app-local-news-detail',
  templateUrl: './local-news-detail.component.html',
  styleUrls: ['./local-news-detail.component.scss']
})
export class LocalNewsDetailComponent implements OnInit {
  article$?: Observable<LocalNewsArticle>;
  loading = false;
  error = false;

  constructor(private route: ActivatedRoute, private router: Router, private service: LocalNewsService) {}

  ngOnInit(): void {
    const stateArticle = this.router.getCurrentNavigation()?.extras.state?.['article'] as LocalNewsArticle | undefined;
    const id = this.route.snapshot.paramMap.get('id');

    if (stateArticle) {
      this.article$ = of(stateArticle);
    } else if (id) {
      this.loading = true;
      this.article$ = this.service.getViennaNewsById(id);
      this.article$.pipe(first()).subscribe({
        next: () => (this.loading = false),
        error: () => {
          this.loading = false;
          this.error = true;
        }
      });
    } else {
      this.router.navigate(['/local-news/vienna']);
    }
  }
}
