import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { KamplarService } from '../../common/services/kamplar.service';
import { IKamp } from '../../models/ikamp';
import Swal from 'sweetalert2';

export interface Kamp  {
  id: number;
  kampAdi: string;
  kampKodu: string;
  aktifMi: boolean;
}

@Component({
  selector: 'app-kamp-islemleri',
  imports: [   MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule],
  templateUrl: './kamp-islemleri.component.html',
  styleUrl: './kamp-islemleri.component.css'
})

export class KampIslemleriComponent {
  form: FormGroup;

  constructor(private kamplarService:KamplarService,private fb: FormBuilder){
    this.form = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      code: ['', Validators.required],
      isActive: [false]
    });
    this.GetAllKamp();

  }
  kampListesi:IKamp[] =[];
 
  onSubmit() {
    // Formdan alınan değerleri kullanarak yeni kamp nesnesi oluşturuyoruz
    const newKamp = {
      ID: this.form.value.id,
      ADI: this.form.value.name,
      KODU: this.form.value.code,
      AKTIFMI: this.form.value.isActive ? 1 : 0 // Boolean'dan 0 veya 1'e dönüştürme
    };
  
    if (this.form.valid) {
      this.kamplarService.add(newKamp, (res, error) => {
        if (error) {
          console.error('Hata oluştu:', error);
          alert('Kamp eklenirken bir hata oluştu: ' + error.message);
        } else {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Yeni Kamp Başarıyla Eklendi.",
            showConfirmButton: false,
            timer: 1500
          });
          this.GetAllKamp();
        }
      });
    } else {
      alert('Form geçerli değil. Lütfen tüm alanları doldurun.');
    }
  }



  GetAllKamp(){
    this.kamplarService.getAllKamp().subscribe((item:IKamp[]) =>{
        this.kampListesi = item;   
    });    
  }

  // Kamp Silme İşlemi
  kampSil(kamp: Kamp) {
  
  }
}
