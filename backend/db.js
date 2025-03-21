require('dotenv').config(); // .env dosyasını yükle
const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Azure SQL Bağlantı Ayarları
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true, // Azure SQL için zorunlu
        enableArithAbort: true,
    },
};

// Veritabanına bağlanma
sql.connect(dbConfig)
    .then(() => console.log("Azure connected succesfully"))
    .catch(err => console.log("Error:", err));

// Yeni Todo Ekleme
app.post('/todos', async (req, res) => {
    try {
        const { task } = req.body;
        if (!task) return res.status(400).send("Task is required.");
        
        const request = new sql.Request();
        await request.query(`INSERT INTO Todos (task, completed) VALUES ('${task}', 0)`);
        
        res.status(201).send({ message: "Todo added!" });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Tüm Todo'ları Listeleme
app.get('/todos', async (req, res) => {
    try {
        const request = new sql.Request();
        const result = await request.query("SELECT * FROM Todos");

        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Backend Başlat
const PORT = 5000;
app.listen(PORT, () => console.log(`Backend is workin on this port: ${PORT} !`));
