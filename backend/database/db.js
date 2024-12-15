const mysql = require('mysql');

// MySQL bağlantısı için ayarlar
const connection = mysql.createConnection({
    host: 'localhost',      // MySQL sunucusu
    user: 'root',           // Kullanıcı adı
    password: '',           // Şifre (boşsa '' yazın)
    database: 'kamp'         
});

// Bağlantıyı kur
connection.connect((err) => {
    if (err) {
        console.error('MySQL bağlantı hatası: ', err.stack);
        return;
    }
    console.log('MySQL bağlantısı başarılı!');
});

// Bağlantıyı dışa aktar
module.exports = connection;
