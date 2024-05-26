const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./controllers/authenticateToken'); // Chemin vers le middleware
const index = require('./controllers/Controller');
const connectDB = require('./model/db');
const cookieParser = require('cookie-parser');

const port = 3000;
const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'ressources')));

// Appliquer le middleware authenticateToken pour toutes les requêtes
// Appliquer le middleware authenticateToken pour toutes les requêtes POST, PUT et PATCH concernant les missions, les présentations, etc.
app.use(['/Postmission', '/Postpresentation', '/Posthistorique', '/Postenseignant', '/Postformation', '/Postrealisation', '/Postactualite', 
         '/Updatemission/:id', '/Updatepresentation/:id', '/Updatehistorique/:id', '/Updateenseignant/:id', '/Updateformation/:id', '/Updaterealisation/:id', '/Updateactualite/:id',
         '/ActivateMission/:id', '/ActivatePresentation/:id', '/ActivateHistorique/:id', '/ActivateEnseignant/:id', '/ActivateFormation/:id', '/ActivateRealisation/:id', '/ActivateActualite/:id', '/ActivateOrganisation/:id'], authenticateToken);

// Routes GET
app.get('/', index.index);
app.get('/Logout', index.index);

app.get('/Actualite', index.Actualite);
app.get('/Enseignant', index.Enseignant);
app.get('/Formation', index.Formation);
app.get('/Historique', index.Historique);
app.get('/Mission', index.Mission);
app.get('/Presentation', index.Presentation);
app.get('/Realisation', index.Realisation);

app.get('/Getmission', index.Getmission);
app.get('/Getpresentation', index.Getpresentation);
app.get('/Gethistorique', index.Gethistorique);
app.get('/Getenseignant', index.Getenseignant);
app.get('/Getformation', index.Getformation);
app.get('/Getrealisation', index.Getrealisation);
app.get('/Getactualite', index.Getactualite);
app.get('/Getorganisation', index.Getorganisation);

// Routes POST
app.post('/signup', index.Signup);
app.post('/signin', index.Signin);

app.post('/Postmission', index.Postmission);
app.post('/Postpresentation', index.Postpresentation);
app.post('/Posthistorique', index.Posthistorique);
app.post('/Postenseignant', index.Postenseignant);
app.post('/Postformation', index.Postformation);
app.post('/Postrealisation', index.Postrealisation);
app.post('/Postactualite', index.Postactualite);

// Routes PUT
app.put('/Updatemission/:id', index.Updatemission);
app.put('/Updatepresentation/:id', index.Updatepresentation);
app.put('/Updatehistorique/:id', index.Updatehistorique);
app.put('/Updateenseignant/:id', index.Updateenseignant);
app.put('/Updateformation/:id', index.Updateformation);
app.put('/Updaterealisation/:id', index.Updaterealisation);
app.put('/Updateactualite/:id', index.Updateactualite);

// Routes PATCH
app.patch('/ActivateMission/:id', index.ActivateMission);
app.patch('/ActivatePresentation/:id', index.ActivatePresentation);
app.patch('/ActivateHistorique/:id', index.ActivateHistorique);
app.patch('/ActivateEnseignant/:id', index.ActivateEnseignant);
app.patch('/ActivateFormation/:id', index.ActivateFormation);
app.patch('/ActivateRealisation/:id', index.ActivateRealisation);
app.patch('/ActivateActualite/:id', index.ActivateActualite);
app.patch('/ActivateOrganisation/:id', index.ActivateOrganisation);

connectDB();

app.listen(port, () => {
    console.log("Serveur actif sur le port " + port);
});
