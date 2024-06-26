const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./controllers/authenticateToken'); // Chemin vers le middleware
const index = require('./controllers/Controller');
const connectDB = require('./model/db');
const cookieParser = require('cookie-parser');

// Import des routes
const missionRoutes = require('./routes/missionRoutes');
const actualiteRoutes = require('./routes/actualiteRoutes');
const enseignantRoutes = require('./routes/enseignantRoutes');
const formationRoutes = require('./routes/formationRoutes');
const historiqueRoutes = require('./routes/historiqueRoutes');
const presentationRoutes = require('./routes/presentationRoutes');
const realisationRoutes = require('./routes/realisationRoutes');

const port = 3000;
const app = express();

// Configuration des middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration des vues
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Configuration du dossier statique
app.use(express.static(path.join(__dirname, 'ressources')));

// Utilisation des routes
app.use('/', missionRoutes);
app.use('/', actualiteRoutes);
app.use('/', enseignantRoutes);
app.use('/', formationRoutes);
app.use('/', historiqueRoutes);
app.use('/', presentationRoutes);
app.use('/', realisationRoutes);

// Routes GET et POST
app.get('/', index.index);
app.post('/signup', index.Signup);
app.post('/signin', index.Signin);
app.get('/logout', index.logout);

// Connexion à la base de données
connectDB();

// Démarrage du serveur
app.listen(port, () => {
    console.log("Serveur actif sur le port " + port);
});
