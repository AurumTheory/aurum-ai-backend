// Import Express
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware: serve file static (opsional)
app.use(express.static("public"));

// Route utama
app.get("/", (req, res) => {
  res.send(`
    <h1>🚀 Halo dari Node.js di GalaxyCloud!</h1>
    <p>Website ini berjalan menggunakan Express.js.</p>
    <p><a href="https://github.com/USERNAME/REPO" target="_blank">Lihat repo GitHub</a></p>
  `);
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`✅ Server berjalan di port ${PORT}`);
});
