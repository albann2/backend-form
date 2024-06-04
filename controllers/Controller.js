const model = require('../model/modeles');
const jwt = require('jsonwebtoken');
const JWT_SECRET = '1111';

// Variable to store department
let department = "";

// Function to create default groups if they do not exist
async function createDefaultGroupsIfNotExist() {
    try {
        const groups = [
            { nom: 'informatique' },
            { nom: 'biologie' },
            { nom: 'langue' }
        ];

        // Check if each group already exists in the database
        for (const group of groups) {
            const existingGroup = await model.Group.findOne({ nom: group.nom });
            if (!existingGroup) {
                // Create a new instance of the Group model for the current group
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

                // Save the group to the database
                await newGroup.save();
                console.log(`Groupe ${group.nom} créé avec succès.`);
            } else {
                console.log(`Le groupe ${group.nom} existe déjà.`);
            }
        }
    } catch (error) {
        console.error('Erreur lors de la création des groupes par défaut :', error);
    }
}

// Call the function to create default groups if they do not exist
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
        res.status(201).json({ message: 'Document created successfully' });
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
    const { email, password, departement } = req.body;
    try {
        const existingUser = await model.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const newUser = new model.User({ email, password, departement });
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

        department = user.departement;

        const payload = { email: user.email };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });
        res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 2 * 60 * 60 * 1000 });
        res.render(department);
    } catch (error) {
        res.status(500).json({ message: 'Error during authentication', error });
    }
};

// Routes GET
exports.Getmission = getAllDocuments(model.Group, department, 'missions');
exports.Getpresentation = getAllDocuments(model.Group, department, 'presentations');
exports.Gethistorique = getAllDocuments(model.Group, department, 'historiques');
exports.Getenseignant = getAllDocuments(model.Group, department, 'enseignants');
exports.Getformation = getAllDocuments(model.Group, department, 'formations');
exports.Getrealisation = getAllDocuments(model.Group, department, 'realisations');
exports.Getactualite = getAllDocuments(model.Group, department, 'actualites');

// Routes POST
exports.Postmission = createDocument(model.Group, department, 'missions');
exports.Postpresentation = createDocument(model.Group, department, 'presentations');
exports.Posthistorique = createDocument(model.Group, department, 'historiques');
exports.Postenseignant = createDocument(model.Group, department, 'enseignants');
exports.Postformation = createDocument(model.Group, department, 'formations');
exports.Postrealisation = createDocument(model.Group, department, 'realisations');
exports.Postactualite = createDocument(model.Group, department, 'actualites');

// Routes PUT
exports.Updatemission = updateDocument(model.Group, department, 'missions');
exports.Updatepresentation = updateDocument(model.Group, department, 'presentations');
exports.Updatehistorique = updateDocument(model.Group, department, 'historiques');
exports.Updateenseignant = updateDocument(model.Group, department, 'enseignants');
exports.Updateformation = updateDocument(model.Group, department, 'formations');
exports.Updaterealisation = updateDocument(model.Group, department, 'realisations');
exports.Updateactualite = updateDocument(model.Group, department, 'actualites');

// Routes PATCH (Update activated)
exports.ActivateMission = updateIsActive(model.Group, department, 'missions');
exports.ActivatePresentation = updateIsActive(model.Group, department, 'presentations');
exports.ActivateHistorique = updateIsActive(model.Group, department, 'historiques');
exports.ActivateEnseignant = updateIsActive(model.Group, department, 'enseignants');
exports.ActivateFormation = updateIsActive(model.Group, department, 'formations');
exports.ActivateRealisation = updateIsActive(model.Group, department, 'realisations');
exports.ActivateActualite = updateIsActive(model.Group, department, 'actualites');
