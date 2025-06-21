const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./src/db/sequelize');
require('dotenv').config();

// Configuration
const app = express();
const port = process.env.PORT || 3000;
const title = "Blog-Leviathan API";

// Middlewares
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());


app.use('/uploads', express.static('uploads'));

// Ajout du favicon (remplacer par un vrai chemin si nécessaire)
app.use(favicon(__dirname + '/favicon.ico'));

// Initialisation de la base de données et routes
sequelize.initDb() // Synchronisation des modèles avec la base de données
    .then(() => {
        // Endpoint de base pour tester
        app.get('/api', (req, res) => {
            res.json('Bienvenue sur Blog-Leviathan API ! 👋');
        });

        // AUTH 
        require('./src/routes/login')(app);

        // USERS
        require('./src/routes/findAllUsers')(app);
        require('./src/routes/createUser')(app);
        require('./src/routes/deleteUser')(app);
        require('./src/routes/updateUser')(app);
        require('./src/routes/findOneUserByPk')(app);


        // Page Settings
        require('./src/routes/findAllPageSettings')(app);
        require('./src/routes/findPageSettingByPk')(app);
        require('./src/routes/createPageSetting')(app);
        require('./src/routes/updatePageSetting')(app);
        require('./src/routes/deletePageSetting')(app);

        // Contact Messages 
        require('./src/routes/contactMessage')(app);


        // Gestion des erreurs 404
        app.use((req, res, next) => {
            const message = `La ressource ${req.originalUrl} n'a pas été trouvée.`;
            res.status(404).json({ message });
        });

        // Gestion des erreurs internes du serveur
        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).json({ message: 'Une erreur interne est survenue.' });
        });

        // Lancer le serveur
        app.listen(port, () => {
            console.log(`${title} est disponible sur http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error("Erreur lors de l'initialisation de la base de données :", err);
    });


