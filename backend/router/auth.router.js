const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const middleware = require("../middleware/auth-middleware");
require('dotenv').config()

const secretKey = "test";  // .env dosyasındaki SECRET_KEY değerini alıyoruz
const options = {
    expiresIn: "10h"
};

router.post('/verify-token',middleware.verifyTokenLogin);


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kullanıcıyı e-posta ile bulalım
        let kullanici = await User.findByEposta(email);

        if (!kullanici) {
            return res.status(403).json({ message: "Kullanıcı adı veya şifre yanlış!" });
        }

        // Şifreyi doğrudan kontrol ediyoruz
        if (kullanici.SIFRE !== password) {
            return res.status(403).json({ message: "Kullanıcı adı veya şifre yanlış!" });
        }

        // JWT token'ını oluşturuyoruz
             const token = jwt.sign(
            { id: kullanici.ID, email: kullanici.EPOSTA, adminmi: kullanici.ADMINMI }, 
            secretKey, 
            options
        );

        // Kullanıcı ve token'ı döndürüyoruz
        const model = { token, kullanici };
        res.json(model);

        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
