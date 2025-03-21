require("dotenv").config();
const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// 📌 **Azure SQL Bağlantı Ayarları**
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true, // Azure için zorunlu
    enableArithAbort: true,
    trustServerCertificate: true, // Sertifika hatasını önlemek için
  },
};

// 📌 **Bağlantıyı Havuz Kullanarak Yönet**
const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool) => {
    console.log("✅ Azure SQL Database Bağlantısı Başarılı!");
    return pool;
  })
  .catch((err) => {
    console.error("❌ Veritabanına bağlanırken hata oluştu:", err);
  });

// 📌 **Yeni Todo Ekle**
app.post("/todos", async (req, res) => {
  try {
    const { task } = req.body;
    if (!task) return res.status(400).json({ message: "Task is required." });

    const pool = await poolPromise;
    await pool
      .request()
      .input("task", sql.NVarChar, task)
      .query("INSERT INTO Todos (task, completed) VALUES (@task, 0)");

    res.status(201).json({ message: "✅ Todo başarıyla eklendi!" });
  } catch (error) {
    console.error("🚨 Hata:", error);
    res.status(500).json({ error: error.message });
  }
});

// 📌 **Tüm Todo'ları Listele**
app.get("/todos", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Todos ORDER BY id DESC");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("🚨 Hata:", error);
    res.status(500).json({ error: error.message });
  }
});

// 📌 **Todo Silme**
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    await pool.request().input("id", sql.Int, id).query("DELETE FROM Todos WHERE id = @id");

    res.status(200).json({ message: "🗑️ Todo başarıyla silindi!" });
  } catch (error) {
    console.error("🚨 Hata:", error);
    res.status(500).json({ error: error.message });
  }
});

// 📌 **Backend'i Başlat**
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Backend çalışıyor: http://localhost:${PORT}`));
