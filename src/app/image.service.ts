import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, deleteDoc, doc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Image {
  id?: string;
  url: string;
  dateAdded?: Date;
  userEmail?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private collectionPath = 'images';

  constructor(private firestore: Firestore) {}

  getImages(): Observable<Image[]> {
    const imagesCollection = collection(this.firestore, this.collectionPath);
    return collectionData(imagesCollection, { idField: 'id' }).pipe(
      map(images => images.map(image => ({
        ...image,
        dateAdded: (image['dateAdded'] as any).toDate()
      })))
    ) as Observable<Image[]>;
  }

  addImage(image: Image): Promise<void> {
    const imagesCollection = collection(this.firestore, this.collectionPath);
    const imageWithDate = { ...image, dateAdded: new Date() };
    return addDoc(imagesCollection, imageWithDate).then(() => {});
  }

  deleteImage(id: string): Promise<void> {
    const imageDoc = doc(this.firestore, `${this.collectionPath}/${id}`);
    return deleteDoc(imageDoc);
  }
}