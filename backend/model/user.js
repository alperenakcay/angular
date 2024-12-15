const connection = require("../database/db");

class User {
    constructor(id, email, password, adminmi) {
        if (!email || !password || adminmi === undefined) {
            throw new Error('Tüm alanlar zorunludur.');
        }
        this.id = id;
        this.email = email;       // Kullanıcının e-posta adresi
        this.password = password; // Kullanıcının şifresi
        this.adminmi = adminmi;   // Kullanıcının admin olup olmadığını belirtir (true/false)
    }

    static findByEposta(email) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM KULLANICILAR WHERE EPOSTA = ?';
            connection.query(query, [email], (err, results) => {
                if (err) {
                    reject(err);  // Hata durumunda reject
                } else {
                    resolve(results[0]);  // İlk sonucu döndür
                }
            });
        });
    }
}

module.exports = User;
