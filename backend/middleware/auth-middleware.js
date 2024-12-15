const jwt = require('jsonwebtoken');
require('dotenv').config();  // .env dosyasındaki değişkenleri almak için

function verifyToken(req, res, next) {
    // Authorization header'dan token alınıyor
    const token = req.headers['authorization'];

    // Token yoksa hata mesajı
    if (!token) {
        return res.status(403).send('Token gerekli.');
    }

    // Bearer token formatı: "Bearer <token>"
    const tokenWithoutBearer = token.split(' ')[1];  // "Bearer" kelimesini atlıyoruz

    // Token doğrulama
    jwt.verify(tokenWithoutBearer, "test", (err, decoded) => {
        if (err) {
            return res.status(401).send('Geçersiz token.');
        }
        
        // Token geçerli, kullanıcı bilgilerini req.userId'ye ekliyoruz
        req.userId = decoded.id;  // Token'dan userId'yi al
        next();  // İleri git (işlem devam etsin)
    });
}


function verifyTokenLogin(req, res) {
    const token = req.headers['authorization'];  // Token, authorization başlığında olmalı

    if (!token) {
        return res.status(403).send('Token gerekli.');
    }

    // Token'ı doğrulama
    const tokenWithoutBearer = token.split(' ')[1];
    jwt.verify(tokenWithoutBearer, "test", (err, decoded) => {
        if (err) {
            return res.status(401).send('Geçersiz token.');
        }

        // Token geçerliyse, true döner
        res.json({ valid: true });
    });
};

module.exports = { verifyToken , verifyTokenLogin };
