// src/db/sequelize.js
const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('../models/user');
const PageSettingModel = require('../models/pageSettings');
const bcrypt = require('bcryptjs');


// Configuration de la base de données
const sequelize = new Sequelize('blog_leviathan', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Désactiver les logs SQL
});

const User = UserModel(sequelize, DataTypes);
const PageSetting = PageSettingModel(sequelize, DataTypes);


// Fonction pour créer un utilisateur par défaut
const createDefaultUser = async () => {
  const username = 'superadmin';
  const password = 'password123'; // Change si nécessaire
  const role = 'super_admin';  // Le rôle de l'utilisateur

  try {
      // Vérifie si l'utilisateur existe déjà
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
          console.log(`L'utilisateur ${username} existe déjà, aucune action requise.`);
          return;
      }

      // Si l'utilisateur n'existe pas, créer un nouvel utilisateur
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({ username, password: hashedPassword, role });
      console.log('Utilisateur superadmin créé avec succès.');
  } catch (error) {
      console.error('Erreur lors de la création de l’utilisateur :', error);
  }
};


// Fonction pour tester la connexion et synchroniser les modèles
const initDb = async () => {
    try {
      await sequelize.authenticate();
      console.log('Connexion à la base de données réussie!');
      
      // Synchronisation des modèles (ici, la table PageSetting sera aussi créée)
      await sequelize.sync({ force: false }); // Ne force pas la création mais synchronise
      console.log('La synchronisation des modèles est terminée.');
      
      // Créer un utilisateur par défaut
      await createDefaultUser();
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de la base de données :', error);
    }
  };
  
  // Exporter les fonctions et les modèles
  module.exports = {
    initDb,
    sequelize,
    User,
    PageSetting, // Exporter aussi le modèle PageSetting
  };