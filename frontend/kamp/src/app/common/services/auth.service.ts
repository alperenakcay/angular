import { Injectable } from '@angular/core';
import { GenericHttpService } from './generic-http.service';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authorization';

  constructor(private httpService: GenericHttpService,private _http: HttpClient) { }

  // Giriş işlemi
  login(username: string, password: string, callBack: (res: any) => void): void {
    const model = {
      "email": username,
      "password": password
    };
    this.httpService.post<any>('auth/login', model, (res) => {
      if (res.token) {
        this.setToken(res.token);
      }
      callBack(res);
    });
  }

  // Token saklama
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Token alma
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Kullanıcı çıkışı
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated(): Promise<boolean> {
    const token = localStorage.getItem('authorization');
  
    if (!token || token.trim() === '') {
      console.log('Token bulunamadı veya geçersiz.');
      return Promise.resolve(false); // Token yoksa hemen false döner
    }
      const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return new Promise((resolve) => {
      this._http.post('http://localhost:5000/api/auth/verify-token', {}, { headers }).subscribe(
        response => { resolve(true)},
        error => { resolve(false); }
      );
    });
  }
  
}
