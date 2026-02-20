import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface News {
  id: string;
  title_short: string;
  desc_short: string;
  title_long: string;
  desc_long: string;
  image: string;
  tag?: string;
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
      .collection<News>('news', ref => ref.orderBy('created_at', 'desc'))
      .valueChanges({ idField: 'id' })
      .pipe(map(list => list.map(n => this.normalizeArticle(n))));
  }

  getTopNews(limit: number = 5): Observable<News[]> {
    return this.firestore
        .collection<News>('news', ref =>
            ref
                .where('top', '==', true)
                .orderBy('created_at', 'desc')
                .limit(limit)
        )
        .valueChanges({ idField: 'id' })
        .pipe(
            map(newsList => newsList.map(news => this.normalizeArticle(news))),
            catchError(error => {
              console.error('Error fetching top news:', error);
              return of([] as News[]); // return empty array on error
            })
        );
  }
  getNewsPage(pageSize: number, startAfterDate: Date | null): Observable<News[]> {
    return this.firestore
      .collection<News>('news', ref => {
        let query = ref.orderBy('created_at', 'desc').limit(pageSize);
        if (startAfterDate) {
          query = query.startAfter(startAfterDate);
        }
        return query;
      })
      .valueChanges({ idField: 'id' })
      .pipe(map(list => list.map(n => this.normalizeArticle(n))));
  }

  getNewsPageByTag(
    tag: string,
    pageSize: number,
    startAfterDate: Date | null
  ): Observable<News[]> {
    return this.firestore
      .collection<News>('news', ref => {
        let query = ref
          .where('tag', '==', tag)
          .orderBy('created_at', 'desc')
          .limit(pageSize);
        if (startAfterDate) {
          query = query.startAfter(startAfterDate);
        }
        return query;
      })
      .valueChanges({ idField: 'id' })
      .pipe(map(list => list.map(n => this.normalizeArticle(n))),
          catchError(error => {
            console.error('Error fetching top news:', error);
            return of([] as News[]); // return empty array on error
          }));
  }

  getNewsById(id: string): Observable<News> {
    return this.firestore
      .collection<News>('news')
      .doc(id)
      .valueChanges({ idField: 'id' })
      .pipe(map(n => (n ? this.normalizeArticle(n) : (n as any))));
  }

  incrementNewsViews(id: string): Promise<void> {
    const newsRef = this.firestore.doc(`news/${id}`);
    return newsRef.update({
      views: firebase.firestore.FieldValue.increment(1)
    });
  }

  getNewsCount(): Observable<number> {
    return this.firestore
      .collection<News>('news')
      .get()
      .pipe(map(snapshot => snapshot.size));
  }

  getNewsCountByTag(tag: string): Observable<number> {
    return this.firestore
      .collection<News>('news', ref => ref.where('tag', '==', tag))
      .get()
      .pipe(map(snapshot => snapshot.size));
  }
}
