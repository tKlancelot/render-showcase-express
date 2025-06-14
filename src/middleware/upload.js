// src/middleware/upload.js
const multer = require('multer');
const path = require('path');

// Définir l'emplacement de stockage et le nom des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');  // Dossier où les images seront stockées
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Obtenir l'extension de l'image
    const filename = Date.now() + ext;  // Nom unique pour chaque image
    cb(null, filename);
  }
});

// Filtre pour n'accepter que les fichiers image
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Si l'image est dans les types autorisés, on la garde
  } else {
    cb(new Error('Seuls les fichiers image (JPEG, PNG, GIF) sont autorisés.'));
  }
};

// Limite la taille des fichiers (ici 5 Mo maximum)
const limits = {
  fileSize: 5 * 1024 * 1024 // Limiter la taille à 5 Mo (5 * 1024 * 1024)
};

// Middleware pour l'upload des fichiers
const upload = multer({ 
  storage, 
  fileFilter,
  limits,
});

// Exporter le middleware
module.exports = upload;
