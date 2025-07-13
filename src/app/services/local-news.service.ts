import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { News } from './news.service';

// Local news articles follow the same structure as regular news
// defined in the `News` interface. No additional fields are required.
export type LocalNewsArticle = News;

@Injectable({ providedIn: 'root' })
export class LocalNewsService {
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

  getViennaNews(): Observable<LocalNewsArticle[]> {
    return this.firestore
      .collection<LocalNewsArticle>('news')
      .valueChanges({ idField: 'id' })
      .pipe(map(list => list.map(a => this.normalizeArticle(a))));
  }

  getViennaNewsById(id: string): Observable<LocalNewsArticle> {
    return this.firestore
      .collection<LocalNewsArticle>('news')
      .doc(id)
      .valueChanges({ idField: 'id' })
      .pipe(map(a => (a ? this.normalizeArticle(a) : (a as any))));
  }

  incrementViews(id: string): Promise<void> {
    // Increment the views field atomically in Firestore
    return this.firestore
      .collection('news')
      .doc(id)
      .update({ views: firebase.firestore.FieldValue.increment(1) });
  }
}
