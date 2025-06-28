import { Component, OnInit } from '@angular/core';
import { NewsService, News } from '../../services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  topStories: News[] = [];
  feed: News[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    const all = this.newsService.getNews();
    this.topStories = all.slice(0, 3);
    this.feed = all.slice(3);
  }

}
