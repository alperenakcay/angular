import { Injectable } from '@angular/core';
import { GenericHttpService } from './generic-http.service'; // GenericHttpService'i dahil ediyoruz
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BasvurularService {

  private apiUrl = 'basvurular'; // Başvurular API'sinin URL'si

  constructor(private genericHttpService: GenericHttpService) { }

  // Token'ı almak ve başvuru listeleme
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Token'ı localStorage'dan alıyoruz
    return new HttpHeaders({
      'authorization': `Bearer ${token}` // Token'ı Authorization header'ında gönderiyoruz
    });
  }

  // Başvuruları getirme (GET)
  getBasvurular(): Observable<any> {
    return new Observable(observer => {
      this.genericHttpService.get<any>(`${this.apiUrl}/all`, (res) => {
        observer.next(res);
      });
    });
  }

  // Başvuru ekleme (POST)
  addBasvuru(basvuru: any): Observable<any> {
    return new Observable(observer => {
      this.genericHttpService.post<any>('basvurular', basvuru, (res) => {
        observer.next(res);
      });
    });
  }

  // Başvuru güncelleme (PUT)
  updateBasvuru(basvuru: any): Observable<any> {
    return new Observable(observer => {
      this.genericHttpService.post<any>('basvurular/update', basvuru, (res) => {
        observer.next(res);
      });
    });
  }

  // Başvuru silme (DELETE)
  deleteBasvuru(basvuruId: number): Observable<any> {
    return new Observable(observer => {
      this.genericHttpService.post<any>('basvurular/delete', { id: basvuruId }, (res) => {
        observer.next(res);
      });
    });
  }
}
