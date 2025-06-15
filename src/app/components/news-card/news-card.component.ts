import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LocalNewsArticle } from '../../services/local-news.service';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent {
  @Input() article!: LocalNewsArticle;
  @Input() linkPrefix = '/local-news/vienna';

  constructor(private router: Router) {}

  open() {
    this.router.navigate([this.linkPrefix, this.article.id]);
    this.router.navigate(['/local-news/vienna', this.article.id]);
  }
}
