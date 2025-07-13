import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LocalNewsArticle } from '../../services/local-news.service';

@Component({
  selector: 'app-top-stories',
  templateUrl: './top-stories.component.html',
  styleUrls: ['./top-stories.component.scss']
})
export class TopStoriesComponent {
  @Input() stories: LocalNewsArticle[] = [];
  @Input() baseRoute = '/local-news/vienna';

  constructor(private router: Router) {}

  open(article: LocalNewsArticle) {
    this.router.navigate([this.baseRoute, article.id], {
      state: { article }
    });
  }
}
