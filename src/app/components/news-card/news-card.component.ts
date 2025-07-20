import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { News } from '../../services/news.service';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent {
  @Input() article!: News;
  @Input() baseRoute = '';

  constructor(private router: Router) {}

  open() {
    this.router.navigate([this.baseRoute, this.article.id], {
      state: { article: this.article }
    });
  }
}
