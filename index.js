const express = require("express");
express.urlencoded({ extended: true });
const port = 5000;
const app = express();
const path = require('path');
const index = require('./controllers/Controller');
const connectDB = require('./model/db');

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'ressources')));
app.get('/index',index.index)

app.get('/Getmission', index.Getmission);
app.get('/Getpresentation', index.Getpresentation);
app.get('/Gethistorique', index.Gethistorique);
app.get('/Getenseignant', index.Getenseignant);
app.get('/Getformation', index.Getformation);
app.get('/Getrealisation', index.Getrealisation);
app.get('/Getactualite', index.Getactualite);
app.get('/Getorganisation', index.Getorganisation);

app.post('/Postmission', index.Postmission);
app.post('/Postpresentation', index.Postpresentation);
app.post('/Posthistorique', index.Posthistorique);
app.post('/Postenseignant', index.Postenseignant);
app.post('/Postformation', index.Postformation);
app.post('/Postrealisation', index.Postrealisation);
app.post('/Postactualite', index.Postactualite);

app.put('/Updatemission/:id', index.Updatemission);
app.put('/Updatepresentation/:id', index.Updatepresentation);
app.put('/Updatehistorique/:id', index.Updatehistorique);
app.put('/Updateenseignant/:id', index.Updateenseignant);
app.put('/Updateformation/:id', index.Updateformation);
app.put('/Updaterealisation/:id', index.Updaterealisation);
app.put('/Updateactualite/:id', index.Updateactualite);

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
    console.log("serveur actif sur le port "+port);
});
