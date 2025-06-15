import { Component, OnInit } from '@angular/core';
import { NewsService, News } from '../../services/news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  newsList: News[] = [];

  constructor(private newsService: NewsService, private router: Router) {}

  ngOnInit(): void {
    this.newsList = this.newsService.getNews();
  }

  openNews(id: number) {
    this.router.navigate(['/news', id]);
  }
}
