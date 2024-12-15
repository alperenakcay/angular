import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2'
import { AuthService } from '../../common/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  num1: number = 0;
  num2: number = 0;
  captchaAnswer: number = 0;
  correctAnswer: number = 0;

  constructor(private _spinner: NgxSpinnerService,
    private authService: AuthService,
     private router: Router) {
    this.generateCaptcha();
  }

  generateCaptcha() {
    this.num1 = Math.floor(Math.random() * 10) + 1;
    this.num2 = Math.floor(Math.random() * 10) + 1;
    this.correctAnswer = this.num1 + this.num2;
  }

  login(form: NgForm) {
    if (this.captchaAnswer === this.correctAnswer) {
      if (form.valid) {
     
        const username = form.value.email;
        const password = form.value.password;
        console.log(username + " "+ password);

        this.authService.login(username,password,(res: any) => {
          if (res && res.token) {
            localStorage.setItem('authorization', res.token); // Token'ı localStorage'a kaydet
            this.router.navigate(['/home']); 
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Giriş Başarılı yönlendiriliyorsunuz",
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Giriş Başarısız lütfen bilgilerinizi doğru giriniz!",
              showConfirmButton: false,
              timer: 1500
            });
          }
        });
      }
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Matematik işlemin sonucu yanlış lütfen doğru cevabı girin!",
        showConfirmButton: false,
        timer: 1500
      });
      this.generateCaptcha(); // Yeni bir CAPTCHA oluştur
    }

  }

}
