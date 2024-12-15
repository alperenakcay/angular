const express = require('express');
const router = express.Router();
const kamplar = require('../model/kamplar');
const { verifyToken } = require('../middleware/auth-middleware');  // auth.js dosyasından verifyToken fonksiyonunu al

// Tüm başvuruları listeleme (Read)
router.get('/all',verifyToken,async  (req, res) => {
    try {
        const results = await  kamplar.findAll();
        console.log(results);
        res.json(results);
    } catch (err) {
        res.status(500).send('Bir hata oluştu.');
    }
});

router.post('/add', verifyToken, async (req, res) => {
    try {
        // İstekten gelen verileri alıyoruz
        const {ID,ADI,KODU,AKTIFMI } = req.body;

        // Hata kontrolü için zorunlu alanları doğrula
        if (!ID || !ADI || !KODU || AKTIFMI === undefined) {
            return res.status(400).send('Eksik veya geçersiz veri gönderildi.');
        }

        // Veritabanına ekleme işlemi
        const insertId = await kamplar.ekle({ID,ADI,KODU,AKTIFMI });

        // Başarılı cevap
        res.status(201).json({ message: 'Kamp başarıyla eklendi.', insertId });
    } catch (err) {
        console.error('Ekleme işlemi sırasında hata oluştu:', err);
        res.status(500).send('Bir hata oluştu.');
    }
});

// ID ile başvuru getirme (Read)
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const result = await kamplar.kampAdiById(req.params.id);

        if (!result) {
            return res.status(404).send('kamp bulunamadı.');
        }
        res.json(result);
    } catch (err) {
        res.status(500).send('Bir hata oluştu.');
    }
});

module.exports = router;
