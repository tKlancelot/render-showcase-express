# Showcase-Leviathan - API REST Backend

## INSTRUCTIONS

### 1. Initialiser un projet Node.js

```bash
npm init -y
```

Cette commande permet d'initialiser un projet Node.js sans prompt, générant automatiquement un fichier package.json.

2. Installer les packages

```bash
npm install mysql2 sequelize express body-parser cors nodemon serve-favicon
```

* mysql2 : Le package qui permet de se connecter à une base de données MySQL.
* sequelize : ORM pour interagir avec la base de données MySQL via JavaScript.
* express : Framework pour créer un serveur et des routes REST API.
* body-parser : Middleware pour analyser les requêtes HTTP et extraire les données envoyées dans le corps de la requête.
* cors : Middleware pour gérer les requêtes Cross-Origin Resource Sharing.
* nodemon : Utilisé pour redémarrer automatiquement le serveur pendant le développement.
* serve-favicon : Middleware pour servir un favicon sur l'API.

3. Installer Insomnia (outil pour tester l'API)

```bash
 sudo snap install insomnia
```

4. Configurer la base de données

- Crée une base de données via phpMyAdmin ou tout autre gestionnaire de base de données.
- Se connecter à la base de données depuis ton fichier sequelize.js avec les bonnes informations de connexion (hôte, utilisateur, mot de passe, base de données).
- Synchroniser les modèles Sequelize avec la base de données.

5. Lancer le serveur en développement

```bash
npm run dev
```

6. Structure du projet

showcase-leviathan/
├── src/
│   ├── db/
│   │   └── sequelize.js      # Fichier de connexion à la base de données
│   ├── models/               # Modèles Sequelize pour les tables
│   ├── routes/               # Routes de l'API (ex. users.js, posts.js)
│   └── controllers/          # Contrôleurs pour traiter les requêtes
├── public/                   # Dossier pour les fichiers statiques
├── app.js                    # Point d'entrée principal de l'application
├── package.json              # Dépendances et scripts du projet
├── package-lock.json         # Fichier de verrouillage des versions de dépendances
└── README.md                 # Documentation du projet

7. Gestion des erreurs

```bash
// Gestion des erreurs 404 par express
app.use((req, res, next) => {
const message = `La ressource ${req.originalUrl} n'a pas été trouvée`;
res.status(404).json({ message });
});

// Gestion des erreurs internes du serveur
app.use((err, req, res, next) => {
console.error(err.stack); // Log de l'erreur pour le débogage
res.status(500).json({ message: 'Something went wrong!' });
});
```

8. INSTALL BRCRYPT ET JSONWEBTOKEN

```bash
npm install jsonwebtoken bcryptjs
```