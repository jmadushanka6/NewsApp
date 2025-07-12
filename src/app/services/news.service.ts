import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface News {
  id: string;
  title_short: string;
  desc_short: string;
  title_long: string;
  desc_long: string;
  image: string;
  bigImage?: string;
  created_at: string;
  views: number;
}

@Injectable({ providedIn: 'root' })
export class NewsService {
  constructor(private firestore: AngularFirestore) {}

  getNews(): Observable<News[]> {
    return this.firestore
      .collection<News>('news')
      .valueChanges({ idField: 'id' });
  }

  getNewsById(id: string): Observable<News> {
    return this.firestore
      .collection<News>('news')
      .doc(id)
      .valueChanges({ idField: 'id' }) as Observable<News>;
  }
}
