const db = require("../database/db");

class basvurular {
  constructor(id, pers_key, kamp_id, donem_id, iptalmi) {
    this.id = id;
    this.pers_key = pers_key;
    this.kamp_id = kamp_id;
    this.donem_id = donem_id;
    this.iptalmi = iptalmi;
  }

  static basvuruWithPersKey(persKey) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM basvurular WHERE pers_key = ?';
      db.query(query, [persKey], (err, results) => {
        if (err) {
          reject(err);  // Hata durumunda reject
        } else {
          resolve(results);
        }
      });
    });
  }

  static create(newData) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO basvurular (pers_key, kamp_id, donem_id, iptalmi) VALUES (?, ?, ?, ?)`;
      db.query(query, [newData.pers_key, newData.kamp_id, newData.donem_id, newData.iptalmi], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  static findAll() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM basvurular';
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


  static update(id, updatedData) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE basvurular SET pers_key = ?, kamp_id = ?, donem_id = ?, iptalmi = ? WHERE id = ?`;
      db.query(query, [updatedData.pers_key, updatedData.kamp_id, updatedData.donem_id, updatedData.iptalmi, id], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM basvurular WHERE id = ?`;
      db.query(query, [id], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }
}
module.exports = basvurular;
