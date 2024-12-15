const db = require("../database/db");

class Kamplar {
  constructor(id, adi, kodu, aktifmi) {
    this.id = id;
    this.adi = adi;
    this.kodu = kodu;
    this.aktifmi = aktifmi;
  }

  static kampAdiById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM kamplar WHERE ID = ?';
      db.query(query, [id], (err, results) => {
        if (err) {
          reject(err);  // Hata durumunda reject
        } else {
          resolve(results);
        }
      });
    });
  }
  static findAll() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM kamplar';
      db.query(query, (err, results) => {
        if (err){
          reject(err);
        } 
        else{
          resolve(results);
        }
      });
    });
  }

  static ekle(kamp) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO kamplar (ID,ADI,KODU,AKTIFMI) VALUES (?, ?, ?, ?)';
      db.query(query, [kamp.ID, kamp.ADI,kamp.KODU,kamp.AKTIFMI], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.insertId); // Eklenen kaydın ID'sini döndürüyoruz
        }
      });
    });
  }
}
module.exports = Kamplar;
