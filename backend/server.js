require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sql = require("mssql");

// Express uygulamasını başlat
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors());

// Azure SQL Veritabanı bağlantı ayarları
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT) || 1433,
  options: {
    encrypt: true, // Azure için gerekli
    trustServerCertificate: false, // Self-signed sertifikalar için
  },
};

// Veritabanına bağlanmayı test et
sql.connect(dbConfig)
  .then(() => console.log("✅ Azure SQL veritabanına başarıyla bağlandı!"))
  .catch((err) => console.error("❌ Veritabanı bağlantı hatası:", err));

// Basit bir test endpoint'i
app.get("/", (req, res) => {
  res.send("Backend API Çalışıyor!");
});

// Server'ı başlat
app.listen(PORT, () => {
  console.log(`🚀 Backend API ${PORT} portunda çalışıyor.`);
});
