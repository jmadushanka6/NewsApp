import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { News } from '../../services/news.service';

@Component({
  selector: 'app-top-stories',
  templateUrl: './top-stories.component.html',
  styleUrls: ['./top-stories.component.scss']
})
export class TopStoriesComponent {
  @Input() stories: News[] = [];
  @Input() baseRoute = '';

  constructor(private router: Router) {}

  open(article: News) {
    this.router.navigate([this.baseRoute, article.id], {
      state: { article }
    });
  }
}
