import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService, News } from '../../services/news.service';
import { LocalNewsArticle } from '../../services/local-news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  topStories: LocalNewsArticle[] = [];
  feed: LocalNewsArticle[] = [];

  constructor(private newsService: NewsService, private router: Router) {}

  ngOnInit(): void {
    const all = this.newsService.getNews().map(n => ({
      id: n.id,
      title: n.title,
      summary: n.preview,
      image_url: n.image,
      category: 'News',
      published_at: '',
      read_more_url: '#',
      content: n.content
    }));
    this.topStories = all.slice(0, 3);
    this.feed = all.slice(3);
  }
}
