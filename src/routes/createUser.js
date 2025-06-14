const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');
const { User } = require('../db/sequelize');

// Configuration de multer pour gérer l'upload de la photo
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Dossier de destination pour les fichiers uploadés
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname); // Nom unique pour le fichier
    cb(null, fileName);
  }
});

// Initialisation de multer avec la configuration définie
const upload = multer({ storage: storage }).single('mainPicture');

// Route pour ajouter un utilisateur
module.exports = (app) => {
  app.post('/api/users', upload, async (req, res) => {
    const { username, password, role } = req.body;
    const mainPicture = req.file ? req.file.filename : null; // Si une image est envoyée, récupère son nom

    try {
      // Vérification si le mot de passe est valide et hachage
      if (!password) {
        return res.status(400).json({ message: 'Le mot de passe est requis' });
      }
      
      const hashedPassword = await bcrypt.hash(password, 10); // Hachage du mot de passe avec bcrypt

      // Création de l'utilisateur avec le mot de passe haché
      const user = await User.create({
        username,
        password: hashedPassword, // Stocker le mot de passe haché
        role,
        mainPicture, // Stocker le nom de la photo (si elle existe)
      });

      res.status(201).json({ data: user });
    } catch (error) {
      console.error('Erreur lors de la création de l’utilisateur:', error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la création de l’utilisateur.' });
    }
  });
};
