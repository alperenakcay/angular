const express = require('express');
const router = express.Router();
const Basvurular = require('../model/basvurular');
const { verifyToken } = require('../middleware/auth-middleware');  // auth.js dosyasından verifyToken fonksiyonunu al

// Tüm başvuruları listeleme (Read)
router.get('/all',verifyToken,async  (req, res) => {
    try {
        const results = await  Basvurular.findAll();
        console.log(results);
        res.json(results);
    } catch (err) {
        res.status(500).send('Bir hata oluştu.');
    }
});

// ID ile başvuru getirme (Read)
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const result = await Basvurular.findById(req.params.id);

        if (!result) {
            return res.status(404).send('Başvuru bulunamadı.');
        }
        res.json(result);
    } catch (err) {
        res.status(500).send('Bir hata oluştu.');
    }
});

/*

// Yeni başvuru ekleme (Create)
router.post('/', verifyToken, async (req, res) => {
    const { pers_key, kamp_id, donem_id, iptalmi } = req.body;
    
    if (!pers_key || !kamp_id || !donem_id) {
        return res.status(400).send('Eksik veri.');
    }

    const newData = new Basvurular(null, pers_key, kamp_id, donem_id, iptalmi);
    
    try {
        const result = await Basvurular.create(newData);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).send('Bir hata oluştu.');
    }
});
*/
// Başvuru güncelleme (Update)
router.put('/:id', verifyToken, async (req, res) => {
    const { pers_key, kamp_id, donem_id, iptalmi } = req.body;

    if (!pers_key || !kamp_id || !donem_id) {
        return res.status(400).send('Eksik veri.');
    }

    const updatedData = { pers_key, kamp_id, donem_id, iptalmi };

    try {
        const result = await Basvurular.update(req.params.id, updatedData);
        if (result.affectedRows === 0) {
            return res.status(404).send('Başvuru bulunamadı.');
        }
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send('Bir hata oluştu.');
    }
});

// Başvuru silme (Delete)
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const result = await Basvurular.delete(req.params.id);
        if (result.affectedRows === 0) {
            return res.status(404).send('Başvuru bulunamadı.');
        }
        res.status(200).send('Başvuru başarıyla silindi.');
    } catch (err) {
        res.status(500).send('Bir hata oluştu.');
    }
});

module.exports = router;
