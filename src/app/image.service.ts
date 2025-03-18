import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, deleteDoc, doc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Image {
  id?: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private collectionPath = 'images';

  constructor(private firestore: Firestore) {}

  getImages(): Observable<Image[]> {
    const imagesCollection = collection(this.firestore, this.collectionPath);
    return collectionData(imagesCollection, { idField: 'id' }) as Observable<Image[]>;
  }

  addImage(image: Image): Promise<void> {
    const imagesCollection = collection(this.firestore, this.collectionPath);
    return addDoc(imagesCollection, image).then(() => {});
  }

  deleteImage(id: string): Promise<void> {
    const imageDoc = doc(this.firestore, `${this.collectionPath}/${id}`);
    return deleteDoc(imageDoc);
  }
}