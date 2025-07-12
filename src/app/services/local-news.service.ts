import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { News } from './news.service';

// Local news articles follow the same structure as regular news
// defined in the `News` interface. No additional fields are required.
export type LocalNewsArticle = News;

@Injectable({ providedIn: 'root' })
export class LocalNewsService {
  constructor(private firestore: AngularFirestore) {}

  getViennaNews(): Observable<LocalNewsArticle[]> {
    return this.firestore
      .collection<LocalNewsArticle>('news')
      .valueChanges({ idField: 'id' });
  }

  getViennaNewsById(id: string): Observable<LocalNewsArticle> {
    return this.firestore
      .collection<LocalNewsArticle>('news')
      .doc(id)
      .valueChanges({ idField: 'id' }) as Observable<LocalNewsArticle>;
  }

  incrementViews(id: string): Promise<void> {
    // Increment the views field atomically in Firestore
    return this.firestore
      .collection('news')
      .doc(id)
      .update({ views: firebase.firestore.FieldValue.increment(1) });
  }
}
