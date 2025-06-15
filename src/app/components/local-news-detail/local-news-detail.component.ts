import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalNewsArticle, LocalNewsService } from '../../services/local-news.service';

@Component({
  selector: 'app-local-news-detail',
  templateUrl: './local-news-detail.component.html',
  styleUrls: ['./local-news-detail.component.scss']
})
export class LocalNewsDetailComponent implements OnInit {
  article?: LocalNewsArticle;

  constructor(private route: ActivatedRoute, private router: Router, private service: LocalNewsService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.article = this.service.getViennaNewsById(id);
    if (!this.article) {
      this.router.navigate(['/local-news/vienna']);
    }
  }
}
