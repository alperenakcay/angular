import { Component, OnInit } from '@angular/core';
import { BasvurularService } from '../../common/services/basvurular.service';
import { MatTableModule } from '@angular/material/table'; // Tablo bileşeni
import { MatButtonModule } from '@angular/material/button'; // Butonlar için
import { MatCardModule } from '@angular/material/card'; // Kart bileşeni
import { KamplarService } from '../../common/services/kamplar.service';
import { CommonModule } from '@angular/common';
import { IKamp } from '../../models/ikamp';

@Component({
  selector: 'app-basvurular',
  templateUrl: './basvurularim-gv.component.html',
  styleUrls: ['./basvurularim-gv.component.css'],
  imports: [CommonModule],
})
export class BasvurularComponent implements OnInit {

  basvurular: any[] = []; // Başvuruları saklayacağımız dizi

  kampAdlari: Map<number, string> = new Map<number, string>();

  constructor(private basvurularService: BasvurularService,
    private kamplarService: KamplarService
  ) { }

  ngOnInit(): void {
    this.getBasvurular();
    this.getKamplar();
  }
  getKamplar(): void {
    this.kamplarService.getAllKamp().subscribe((kamp:IKamp[]) => {

      kamp.forEach((element:IKamp) => {
        this.kampAdlari.set(element.ID || 0,element.ADI);
      });
    });
  }

  getKampAdiById(id: number): string {
    return this.kampAdlari.get(id) || 'Bilinmiyor';
    
  }


  // Başvuruları getirme
  getBasvurular(): void {
    this.basvurularService.getBasvurular().subscribe(res => {
      this.basvurular = res; // Gelen başvuruları dizimize atıyoruz
    });
  }

  // Başvuru ekleme
  addBasvuru(basvuru: any): void {
    this.basvurularService.addBasvuru(basvuru).subscribe(res => {
      this.getBasvurular(); // Yeni başvuru ekledikten sonra listeyi yeniliyoruz
    });
  }

  // Başvuru güncelleme
  updateBasvuru(basvuru: any): void {
    this.basvurularService.updateBasvuru(basvuru).subscribe(res => {
      this.getBasvurular(); // Güncelleme işlemi sonrası listeyi yeniliyoruz
    });
  }

  // Başvuru silme
  deleteBasvuru(basvuruId: number): void {
    this.basvurularService.deleteBasvuru(basvuruId).subscribe(res => {
      this.getBasvurular(); // Silme işlemi sonrası listeyi yeniliyoruz
    });
  }
}
