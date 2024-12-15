const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./database/db");
const authRouter = require("./router/auth.router");
const basvurularRouter = require("./router/basvuru.router");
const kamplarRouter = require("./router/kamplar.router");

require('dotenv').config();  // .env dosyasındaki değişkenleri almak için

app.use(express.json());
app.use(cors());

//LOGİN İŞLEMLERİ İÇİN APİ İSTEKLERİ BURADA

app.use("/api/auth",authRouter);

app.use('/api/basvurular', basvurularRouter);

app.use('/api/kamplar', kamplarRouter);

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log("uyugulama http://localhost:"+port+" portundan ayağa kalktı");
});


