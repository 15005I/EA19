import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Image {
  id?: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})

export class ImageService {
  private images: Image[] = [];

  getImages(): Observable<Image[]> {
    return of(this.images);
  }

  addImage(image: Image): Promise<void> {
    image.id = this.generateId();
    this.images.push(image);
    return Promise.resolve();
  }

  deleteImage(id: string): Promise<void> {
    this.images = this.images.filter(image => image.id !== id);
    return Promise.resolve();
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}