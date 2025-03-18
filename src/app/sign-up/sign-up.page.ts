import { Component, OnInit } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SignUpPage implements OnInit {

  ngOnInit() {
  }

  // Función que se ejecuta al hacer submit del formulario
  email: string = '';
  password: string = '';

  constructor(
    private alertController: AlertController,
    private router: Router,
    private authService: AuthService
  ){}

  async onSubmit() {
    try{
      await this.authService.register(this.email, this.password);
      const alert = await this.alertController.create({
        header: 'Signup Success',
        message: 'You have created successfully!',
        buttons: ['OK'],
      });
      await alert.present();
      this.router.navigate(['/login']);
    } catch (error) {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Please complete all.',
          buttons: ['OK'],
        });
        await alert.present();
    }
  }

  // Función para validar el formato del correo
  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email); // Retorna true si el correo es válido
  }

  //funcion para navegacion
  onSignUp() {
    this.router.navigateByUrl("login")
  }
}