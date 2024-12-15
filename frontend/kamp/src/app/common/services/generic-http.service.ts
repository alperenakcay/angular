import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, model } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {

  api: string = "http://localhost:5000/api";


  constructor(
    private _http: HttpClient,
    private _spinner: NgxSpinnerService

  ) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authorization'); // veya başka bir yerden alınabilir
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  }


  get<T>(api: string, callBack: (res: T) => void): void {
    this._spinner.show();
    this._http.get<T>(`${this.api}/${api}`, { headers: this.getHeaders() }).subscribe({
      next: (res: T) => {
        callBack(res);
        this._spinner.hide();
      },
      error: (err: HttpErrorResponse) => {
        this._spinner.hide();
      }
    });
  }


  post<T>(api: string, model: T, callBack: (res: T | null, error?: HttpErrorResponse) => void): void {
    this._spinner.show();
    this._http.post<T>(`${this.api}/${api}`, model, { headers: this.getHeaders() }).subscribe({
      next: (res: T) => {
        callBack(res); // Başarılı yanıt durumunda `res` ile döner
        this._spinner.hide();
      },
      error: (err: HttpErrorResponse) => {
        callBack(null, err); // Hata durumunda `error` ile döner
        this._spinner.hide();
      }
    });
  }
}
