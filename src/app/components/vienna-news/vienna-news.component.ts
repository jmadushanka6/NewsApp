import { Component, OnInit } from '@angular/core';
import { LocalNewsArticle, LocalNewsService } from '../../services/local-news.service';

@Component({
  selector: 'app-vienna-news',
  templateUrl: './vienna-news.component.html',
  styleUrls: ['./vienna-news.component.scss']
})
export class ViennaNewsComponent implements OnInit {
  topStories: LocalNewsArticle[] = [];
  feed: LocalNewsArticle[] = [];

  constructor(private localNews: LocalNewsService) {}

  ngOnInit(): void {
    const all = this.localNews.getViennaNews();
    this.topStories = all.slice(0, 3);
    this.feed = all.slice(3);
  }
}
