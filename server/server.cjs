const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();

const PORT = 5000;

// Gör så att frontend och backend kan kommunicera.
app.use(cors());

// Gör uploads-mappen publik så att bilderna kan visas i webbläsaren.
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

// Här bestämmer jag var uppladdade filer ska sparas.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  // Ger filen ett unikt namn så att filer inte skriver över varandra.
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
});

// Route som tar emot en bild från frontend.
app.post(
  "/api/upload",
  upload.single("image"),
  function (req, res) {
    // Om ingen fil skickades tillbaka ett fel.
    if (!req.file) {
      return res.status(400).json({
        message: "Ingen fil skickades.",
      });
    }

    // Skickar tillbaka länken till bilden.
    res.json({
      message: "Bilden laddades upp.",

      imageUrl: `http://localhost:${PORT}/uploads/${req.file.filename}`,
    });
  }
);

// Startar servern.
app.listen(PORT, function () {
  console.log(`Servern körs på http://localhost:${PORT}`);
});