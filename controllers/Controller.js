const model = require('../models/models');
const jwt = require('jsonwebtoken');
const JWT_SECRET = '1111';

// Fonctions de rendu de vue
exports.index = (req, res) => res.render('main');
exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/main');
}
exports.Actualite = (req, res) => res.render('actualite');
exports.Enseignant = (req, res) => res.render('enseignant');
exports.Formation = (req, res) => res.render('formation');
exports.Historique = (req, res) => res.render('historique');
exports.Mission = (req, res) => res.render('mission');
exports.Presentation = (req, res) => res.render('presentation');
exports.Realisation = (req, res) => res.render('realisation');

// Fonction générique pour les requêtes GET
const getAllDocuments = (Model, groupName, fieldName) => async (req, res) => {
    try {
        const group = await Model.findOne({ nom: groupName });
        if (!group) {
            return res.status(404).json({ message: 'Groupe non trouvé' });
        }
        res.json(group[fieldName]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur de récupération' });
    }
};

// Fonction générique pour les requêtes POST
const createDocument = (Model, groupName, fieldName) => async (req, res) => {
    try {
        const group = await Model.findOne({ nom: groupName });
        if (!group) {
            return res.status(404).json({ message: 'Groupe non trouvé' });
        }
        group[fieldName].push(req.body);
        await group.save();
        res.status(201).json(group[fieldName]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur de soumission' });
    }
};

// Fonction générique pour les requêtes PUT (Update)
const updateDocument = (Model, groupName, fieldName) => async (req, res) => {
    try {
        const group = await Model.findOne({ nom: groupName });
        if (!group) {
            return res.status(404).json({ message: 'Groupe non trouvé' });
        }
        const document = group[fieldName].id(req.params.id);
        if (!document) {
            return res.status(404).json({ message: 'Document non trouvé' });
        }
        Object.assign(document, req.body);
        await group.save();
        res.json(document);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur de mise à jour' });
    }
};

// Fonction pour mettre à jour l'état activated
const updateIsActive = (Model, groupName, fieldName) => async (req, res) => {
    try {
        const group = await Model.findOne({ nom: groupName });
        if (!group) {
            return res.status(404).json({ message: 'Groupe non trouvé' });
        }
        const document = group[fieldName].id(req.params.id);
        if (!document) {
            return res.status(404).json({ message: 'Document non trouvé' });
        }
        document.activated = req.body.activated;
        await group.save();
        res.json({ message: 'success' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur de mise à jour de l\'état' });
    }
};

// Gestion des utilisateurs
exports.Signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await model.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = new model.User({ email, password });
        await newUser.save();
        await exports.Signin(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

exports.Signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await model.User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const payload = { email: user.email };
        const token = jwt.sign(payload, JWT_SECRET);
        const maxAge = 120 * 60 * 1000;
        res.cookie('token', token, { httpOnly: true, secure: true, maxAge });
        res.render('index');
    } catch (error) {
        res.status(500).json({ message: 'Error during authentication', error });
    }
};

// Routes GET
exports.Getmission = getAllDocuments(model.Group, 'informatique', 'missions');
exports.Getpresentation = getAllDocuments(model.Group, 'informatique', 'presentations');
exports.Gethistorique = getAllDocuments(model.Group, 'informatique', 'historiques');
exports.Getenseignant = getAllDocuments(model.Group, 'informatique', 'enseignants');
exports.Getformation = getAllDocuments(model.Group, 'informatique', 'formations');
exports.Getrealisation = getAllDocuments(model.Group, 'informatique', 'realisations');
exports.Getactualite = getAllDocuments(model.Group, 'informatique', 'actualites');

// Routes POST
exports.Postmission = createDocument(model.Group, 'informatique', 'missions');
exports.Postpresentation = createDocument(model.Group, 'informatique', 'presentations');
exports.Posthistorique = createDocument(model.Group, 'informatique', 'historiques');
exports.Postenseignant = createDocument(model.Group, 'informatique', 'enseignants');
exports.Postformation = createDocument(model.Group, 'informatique', 'formations');
exports.Postrealisation = createDocument(model.Group, 'informatique', 'realisations');
exports.Postactualite = createDocument(model.Group, 'informatique', 'actualites');

// Routes PUT
exports.Updatemission = updateDocument(model.Group, 'informatique', 'missions');
exports.Updatepresentation = updateDocument(model.Group, 'informatique', 'presentations');
exports.Updatehistorique = updateDocument(model.Group, 'informatique', 'historiques');
exports.Updateenseignant = updateDocument(model.Group, 'informatique', 'enseignants');
exports.Updateformation = updateDocument(model.Group, 'informatique', 'formations');
exports.Updaterealisation = updateDocument(model.Group, 'informatique', 'realisations');
exports.Updateactualite = updateDocument(model.Group, 'informatique', 'actualites');

// Routes PATCH (Update activated)
exports.ActivateMission = updateIsActive(model.Group, 'informatique', 'missions');
exports.ActivatePresentation = updateIsActive(model.Group, 'informatique', 'presentations');
exports.ActivateHistorique = updateIsActive(model.Group, 'informatique', 'historiques');
exports.ActivateEnseignant = updateIsActive(model.Group, 'informatique', 'enseignants');
exports.ActivateFormation = updateIsActive(model.Group, 'informatique', 'formations');
exports.ActivateRealisation = updateIsActive(model.Group, 'informatique', 'realisations');
exports.ActivateActualite = updateIsActive(model.Group, 'informatique', 'actualites');
