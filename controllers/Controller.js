const model = require('../model/modeles');
const jwt = require('jsonwebtoken');
const JWT_SECRET = '1111';

// Fonctions de rendu de vue
exports.index = (req, res) => res.render('main');
exports.logout = (req, res) => {
    res.clearCookie('token'); // Supprime le cookie nommé "token"
    res.redirect('/main'); // Redirige l'utilisateur vers la page de connexion
}
exports.Actualite = (req, res) => res.render('actualite');
exports.Enseignant = (req, res) => res.render('enseignant');
exports.Formation = (req, res) => res.render('formation');
exports.Historique = (req, res) => res.render('historique');
exports.Mission = (req, res) => res.render('mission');
exports.Presentation = (req, res) => res.render('presentation');
exports.Realisation = (req, res) => res.render('realisation');

// Fonction générique pour les requêtes GET
const getAllDocuments = (Model) => async (req, res) => {
    try {
        const result = await Model.find();
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur de récupération' });
    }
};

// Fonction générique pour les requêtes POST
const createDocument = (Model, uniqueFields) => async (req, res) => {
    try {
        const data = uniqueFields.reduce((acc, field) => {
            acc[field] = req.body[field];
            return acc;
        }, {});

        const existingDocument = await Model.findOne(data);
        if (existingDocument) {
            return res.status(400).json({ message: 'Le document existe déjà' });
        }

        const document = new Model(data);
        await document.save();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur de soumission' });
    }
};

// Fonction générique pour les requêtes PUT (Update)
const updateDocument = (Model, updateFields) => async (req, res) => {
    try {
        const data = updateFields.reduce((acc, field) => {
            if (req.body[field] !== undefined) {
                acc[field] = req.body[field];
            }
            return acc;
        }, {});

        const updatedDocument = await Model.findByIdAndUpdate(req.params.id, data, {
            new: true,
            runValidators: true
        });

        if (!updatedDocument) {
            return res.status(404).json({ message: 'Document non trouvé' });
        }

        res.json(updatedDocument);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur de mise à jour' });
    }
};

// Fonction pour mettre à jour l'état activated
const updateIsActive = (Model) => async (req, res) => {
    try {
        const { id } = req.params;
        const { activated } = req.body;

        const existingDocument = await Model.findById(id);
        if (!existingDocument) {
            return res.status(404).json({ message: 'Document non trouvé' });
        }

        existingDocument.activated = activated;
        await existingDocument.save();

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
        // Après la création de l'utilisateur, appeler la fonction Signin avec les informations d'identification de l'utilisateur
        await exports.Signin(req, res); // Appel de la fonction de connexion (Signin)

    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

exports.Signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await model.User.findOne({ email });
        if (!user) {
            await exports.Signin(req, res); // Appel de la fonction de connexion (Signin)
        }

        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
            await exports.Signin(req, res); // Appel de la fonction de connexion (Signin)
        }

        const payload = { email: user.email };
        const token = jwt.sign(payload, JWT_SECRET);

        // Définir la durée de validité du cookie en millisecondes (par exemple, 1 heure)
        const maxAge = 120 * 60 * 1000; // 1 heure en millisecondes

        // Définir le cookie avec le token JWT
        res.cookie('token', token, { httpOnly: true, secure: true, maxAge });

        // Rediriger ou renvoyer une réponse à votre application cliente
        res.render('index');
    } catch (error) {
        res.status(500).json({ message: 'Error during authentication', error });
    }
};


// Routes GET
exports.Getmission = getAllDocuments(model.Mission);
exports.Getpresentation = getAllDocuments(model.Presentation);
exports.Gethistorique = getAllDocuments(model.Historique);
exports.Getenseignant = getAllDocuments(model.Enseignant);
exports.Getformation = getAllDocuments(model.Formation);
exports.Getrealisation = getAllDocuments(model.Realisation);
exports.Getactualite = getAllDocuments(model.Actualite);
exports.Getorganisation = getAllDocuments(model.Organisation);

// Routes POST
exports.Postmission = createDocument(model.Mission, ['Description', 'Image']);
exports.Postpresentation = createDocument(model.Presentation, ['Description', 'Image']);
exports.Posthistorique = createDocument(model.Historique, ['Description', 'Image']);
exports.Postenseignant = createDocument(model.Enseignant, [
    'nomComplet', 'adresseMail', 'telephone', 'domainesExpertise',
    'coursEnseignes', 'disponibilite', 'responsabilite', 'imageProfil'
]);
exports.Postformation = createDocument(model.Formation, [
    'titre', 'presentation', 'admission', 'parcours', 'parcoursImage'
]);
exports.Postrealisation = createDocument(model.Realisation, [
    'titre', 'annee', 'description'
]);
exports.Postactualite = createDocument(model.Actualite, [
    'titre', 'Description', 'semaine'
]);

// Routes PUT
exports.Updatemission = updateDocument(model.Mission, ['Description', 'Image']);
exports.Updatepresentation = updateDocument(model.Presentation, ['Description', 'Image']);
exports.Updatehistorique = updateDocument(model.Historique, ['Description', 'Image']);
exports.Updateenseignant = updateDocument(model.Enseignant, [
    'nomComplet', 'adresseMail', 'telephone', 'domainesExpertise',
    'coursEnseignes', 'disponibilite', 'responsabilite', 'imageProfil'
]);
exports.Updateformation = updateDocument(model.Formation, [
    'titre', 'presentation', 'admission', 'parcours', 'parcoursImage'
]);
exports.Updaterealisation = updateDocument(model.Realisation, [
    'titre', 'annee', 'description'
]);
exports.Updateactualite = updateDocument(model.Actualite, [
    'titre', 'Description', 'semaine'
]);

// Routes PATCH (Update activated)
exports.ActivateMission = updateIsActive(model.Mission);
exports.ActivatePresentation = updateIsActive(model.Presentation);
exports.ActivateHistorique = updateIsActive(model.Historique);
exports.ActivateEnseignant = updateIsActive(model.Enseignant);
exports.ActivateFormation = updateIsActive(model.Formation);
exports.ActivateRealisation = updateIsActive(model.Realisation);
exports.ActivateActualite = updateIsActive(model.Actualite);
exports.ActivateOrganisation = updateIsActive(model.Organisation);
