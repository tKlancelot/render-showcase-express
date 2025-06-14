const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('../models/user');
const PageSettingModel = require('../models/pageSettings');
const bcrypt = require('bcryptjs');

// Lire les variables d'environnement
const DB_NAME = process.env.DB_NAME || 'blog_leviathan';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'root';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 3306;  // 5432 pour Postgres
const DB_DIALECT = process.env.DB_DIALECT || 'mysql'; // Change en 'postgres' pour Supabase

// Connexion à la base de données
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  logging: false,
});

// Initialiser les modèles
const User = UserModel(sequelize, DataTypes);
const PageSetting = PageSettingModel(sequelize, DataTypes);


// Créer un utilisateur par défaut
const createDefaultUser = async () => {
  const username = 'superadmin';
  const password = 'password123';
  const role = 'super_admin';

  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      console.log(`L'utilisateur ${username} existe déjà, aucune action requise.`);
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashedPassword, role });
    console.log('Utilisateur superadmin créé avec succès.');
  } catch (error) {
    console.error('Erreur lors de la création de l’utilisateur :', error);
  }
};

// Initialiser la DB
const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données réussie!');
    await sequelize.sync({ force: false });
    console.log('La synchronisation des modèles est terminée.');
    await createDefaultUser();
    console.log(`Connexion DB : ${DB_DIALECT}://${DB_USER}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);
    console.log(process.env);
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la base de données :", error);
  }
};

module.exports = {
  initDb,
  sequelize,
  User,
  PageSetting,
};
