// index.js
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// serve static file (optional)
app.use(express.static("public"));

// route utama
app.get("/", (req, res) => {
  res.send(`
    <h1>🚀 Halo dari The Web3 Traders</h1>
    <p>Website Node.js ini berhasil dijalankan di GalaxyCloud.app</p>
  `);
});

// jalankan server
app.listen(PORT, () => {
  console.log(`✅ Server aktif di port ${PORT}`);
});
