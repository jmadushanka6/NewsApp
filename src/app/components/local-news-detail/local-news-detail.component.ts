import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalNewsArticle, LocalNewsService } from '../../services/local-news.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-local-news-detail',
  templateUrl: './local-news-detail.component.html',
  styleUrls: ['./local-news-detail.component.scss']
})
export class LocalNewsDetailComponent implements OnInit {
  article$?: Observable<LocalNewsArticle>;

  constructor(private route: ActivatedRoute, private router: Router, private service: LocalNewsService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      //this.service.incrementViews(id);
      this.article$ = this.service.getViennaNewsById(id);
    } else {
      this.router.navigate(['/local-news/vienna']);
    }
  }
}
