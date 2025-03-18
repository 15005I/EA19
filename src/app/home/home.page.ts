import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonInput, IonCard, IonCardHeader, IonCardContent, IonCardTitle } from '@ionic/angular/standalone';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Image, ImageService } from '../image.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonInput, IonCard, IonCardHeader, IonCardContent, IonCardTitle, FormsModule, CommonModule],
})

export class HomePage implements OnInit {
  images$!: Observable<Image[]>;
  imageUrl: string = '';

  constructor(private router: Router, private imageService: ImageService){}

  ngOnInit() {
    this.getImages();
  }

  getImages() {
    this.images$ = this.imageService.getImages();
  }

  addImage(imageUrl: string) {
    if (imageUrl) {
      const newImage: Image = { url: imageUrl };
      this.imageService.addImage(newImage).then(() => {
        this.getImages(); 
        this.imageUrl = ''; 
      });
    }
  }

  deleteImage(id: string | undefined) {
    if (id) {
      this.imageService.deleteImage(id).then(() => {
        this.getImages();
      });
    }
  }

  navigateToLogin(){
    this.router.navigate(["/login"]);
  }

  navigateToSignUp(){
      this.router.navigate(["/sign-up"]);
  }
}