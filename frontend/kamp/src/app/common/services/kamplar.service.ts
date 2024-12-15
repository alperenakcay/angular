import { Injectable } from '@angular/core';
import { GenericHttpService } from './generic-http.service'; // GenericHttpService'i dahil ediyoruz
import { Observable } from 'rxjs';
import { IKamp } from '../../models/ikamp';

@Injectable({
  providedIn: 'root'
})
export class KamplarService {
  private apiUrl = 'kamplar';
  constructor(private genericHttpService: GenericHttpService) { }



  getKampAdiById(id: number): Observable<any> {
    return new Observable(observer => {
      this.genericHttpService.get<any>(`${this.apiUrl}/${id}`, (res) => {
        observer.next(res);
      });
    });
  }

  add(kamp: any, callback: (res: any, error?: any) => void): void {
    console.log(kamp);
    this.genericHttpService.post<any>(`${this.apiUrl}/add`, kamp, callback);
  }

  getAllKamp(): Observable<IKamp[]> {
    return new Observable(observer => {
      this.genericHttpService.get<IKamp[]>(`${this.apiUrl}/all`, (res) => {
        observer.next(res);
      });
    });
  }
}
