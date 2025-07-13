import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface News {
  id: string;
  title_short: string;
  desc_short: string;
  title_long: string;
  desc_long: string;
  image: string;
  bigImage?: string;
  created_at: any;
  views: number;
}

@Injectable({ providedIn: 'root' })
export class NewsService {
  constructor(private firestore: AngularFirestore) {}

  private normalizeArticle<T extends { created_at: any }>(article: T): T & { created_at: Date } {
    const raw = article.created_at as any;
    let date: Date;
    if (raw && typeof raw === 'object' && 'toDate' in raw) {
      date = (raw as firebase.firestore.Timestamp).toDate();
    } else {
      date = new Date(raw);
    }
    return { ...(article as any), created_at: date };
  }

  getNews(): Observable<News[]> {
    return this.firestore
      .collection<News>('news')
      .valueChanges({ idField: 'id' })
      .pipe(map(list => list.map(n => this.normalizeArticle(n))));
  }

  getNewsById(id: string): Observable<News> {
    return this.firestore
      .collection<News>('news')
      .doc(id)
      .valueChanges({ idField: 'id' })
      .pipe(map(n => (n ? this.normalizeArticle(n) : (n as any))));
  }
}
