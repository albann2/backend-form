const model = require('../model/modeles');
const jwt = require('jsonwebtoken');
const JWT_SECRET = '1111';



// Fonction pour créer les groupes par défaut s'ils n'existent pas déjà
async function createDefaultGroupsIfNotExist() {
    try {
        const groups = [
            { nom: 'informatique' },
            { nom: 'biologie' },
            { nom: 'langue' }
        ];

        // Vérifiez si chaque groupe existe déjà dans la base de données
        for (const group of groups) {
            const existingGroup = await model.Group.findOne({ nom: group.nom });
            if (!existingGroup) {
                // Créez une instance du modèle Group pour le groupe actuel
                const newGroup = new model.Group({
                    nom: group.nom,
                    historiques: [],
                    missions: [],
                    presentations: [],
                    enseignants: [],
                    formations: [],
                    realisations: [],
                    actualites: []
                });

                // Enregistrez le groupe dans la base de données
                await newGroup.save();
                console.log(`Groupe ${group.nom} succès.`);
            } else {
                console.log(`Le groupe ${group.nom} existe déjà.`);
            }
        }
    } catch (error) {
        console.error('Erreur lors de la création des groupes par défaut :', error);
    }
}

// Appelez la fonction pour créer les groupes par défaut s'ils n'existent pas déjà
createDefaultGroupsIfNotExist();






// Rendering view functions
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

// Generic function for GET requests
const getAllDocuments = (Model, groupName, fieldName) => async (req, res) => {
    try {
        const group = await Model.findOne({ nom: groupName });
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        res.json(group[fieldName]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting data' });
    }
};

// Generic function for POST requests
const createDocument = (Model, groupName, fieldName) => async (req, res) => {
    try {
        const group = await Model.findOne({ nom: groupName });
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        group[fieldName].push(req.body);
        await group.save();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error submitting data' });
    }
};

// Generic function for PUT (Update) requests
const updateDocument = (Model, groupName, fieldName) => async (req, res) => {
    try {
        const group = await Model.findOne({ nom: groupName });
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        const document = group[fieldName].id(req.params.id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        Object.assign(document, req.body);
        await group.save();
        res.json(document);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating data' });
    }
};

// Function for updating the 'activated' state
const updateIsActive = (Model, groupName, fieldName) => async (req, res) => {
    try {
        const group = await Model.findOne({ nom: groupName });
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        const document = group[fieldName].id(req.params.id);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }
        document.activated = req.body.activated;
        await group.save();
        res.json({ message: 'Success' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating status' });
    }
};

// User management
exports.Signup = async (req, res) => {
    const { email, password ,departement} = req.body;
    try {
        const existingUser = await model.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = new model.User({ email, password });
        await newUser.save();
        await exports.Signin(req, res);  // Auto-login after signup
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
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });
        res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 2 * 60 * 60 * 1000 });
        res.render('informatique');
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