import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonInput, IonCard, IonCardHeader, IonCardContent, IonCardTitle } from '@ionic/angular/standalone';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Image, ImageService } from '../image.service';
import { Observable } from 'rxjs';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonInput, IonCard, IonCardHeader, IonCardContent, IonCardTitle, FormsModule, CommonModule],
})

export class HomePage implements OnInit {
  images$!: Observable<Image[]>;
  imageUrl: string = '';
  user: User | null = null;

  constructor(private router: Router, private imageService: ImageService, private auth: Auth, private authService: AuthService) {}

  ngOnInit() {
    this.getImages();
    onAuthStateChanged(this.auth, (user) => {
      this.user = user;
    });
  }

  getImages() {
    this.images$ = this.imageService.getImages();
  }

  addImage(imageUrl: string) {
    if (this.user) {
      if (imageUrl) {
        const newImage: Image = { url: imageUrl, userEmail: this.user.email || '' };
        this.imageService.addImage(newImage).then(() => {
          this.getImages();
          this.imageUrl = '';
        });
      }
    } else {
      this.router.navigate(['/sign-up']);
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

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    });
  }
}