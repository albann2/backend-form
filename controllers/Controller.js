const model = require('../model/modeles');
exports.index=(req,res)=>{
    res.render('index')
}
exports.Actualite=(req,res)=>{
    res.render('actualite')
}
exports.Enseignant=(req,res)=>{
    res.render('enseignant')
}
exports.Formation=(req,res)=>{
    res.render('formation')
}
exports.Historique=(req,res)=>{
    res.render('historique')
}
exports.Mission=(req,res)=>{
    res.render('mission')
}
exports.Presentation=(req,res)=>{
    res.render('presentation')
}
exports.Realisation=(req,res)=>{
    res.render('realisation')
}

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
        const data = {};
        uniqueFields.forEach(field => {
            data[field] = req.body[field];
        });

        // Vérifier si un document similaire existe déjà
        const existingDocument = await Model.findOne(data);
        if (existingDocument) {
            return res.status(400).json({ message: 'Le document existe déjà' });
        }

        // Créer et enregistrer le nouveau document
        let document = new Model(data);
        await document.save();
        res.redirect('/index')
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur de soumission' });
    }
};

// Fonction générique pour les requêtes PUT (Update)
const updateDocument = (Model, uniqueFields) => async (req, res) => {
    try {
        const data = {};
        uniqueFields.forEach(field => {
            if (req.body[field] !== undefined) {
                data[field] = req.body[field];
            }
        });

        // Vérifier si le document existe
        const existingDocument = await Model.findById(req.params.id);
        if (!existingDocument) {
            return res.status(404).json({ message: 'Document non trouvé' });
        }

        // Vérifier si un autre document avec les mêmes champs uniques existe
        const query = uniqueFields.reduce((acc, field) => {
            acc[field] = req.body[field];
            return acc;
        }, { _id: { $ne: req.params.id } }); // Exclure le document actuel de la recherche

        const duplicateDocument = await Model.findOne(query);
        if (duplicateDocument) {
            return res.status(409).json({ message: 'Un document avec les mêmes champs uniques existe déjà' });
        }

        // Mettre à jour le document
        const updatedDocument = await Model.findByIdAndUpdate(
            req.params.id,
            { $set: data },
            { new: true, runValidators: true }
        );

        if (!updatedDocument) {
            return res.status(404).json({ message: 'Document non trouvé après la mise à jour' });
        }

        res.json({ message: 'Mise à jour réussie', data: updatedDocument });
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

        // Vérifier si le document existe
        const existingDocument = await Model.findById(id);
        if (!existingDocument) {
            return res.status(404).json({ message: 'Document non trouvé' });
        }

        // Mettre à jour l'état activated
        existingDocument.activated = activated;
        await existingDocument.save();

        res.json({ message: 'success' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur de mise à jour de l\'état' });
    }
};

/*--------------------API GET*/
exports.Getmission = getAllDocuments(model.Mission);
exports.Getpresentation = getAllDocuments(model.Presentation);
exports.Gethistorique = getAllDocuments(model.Historique);
exports.Getenseignant = getAllDocuments(model.Enseignant);
exports.Getformation = getAllDocuments(model.Formation);
exports.Getrealisation = getAllDocuments(model.Realisation);
exports.Getactualite = getAllDocuments(model.Actualite);
exports.Getorganisation = getAllDocuments(model.Organisation);

/**-------------------API POST */
exports.Postmission = createDocument(model.Mission, ['Description', 'Image']);
exports.Postpresentation = createDocument(model.Presentation, ['Description', 'Image']);
exports.Posthistorique = createDocument(model.Historique, ['Description', 'Image']);
exports.Postenseignant = createDocument(model.Enseignant, [
    'nomComplet', 'adresseMail', 'telephone', 'domainesExpertise', 
    'grade', 'responsabilite', 'imageProfil'
]);
exports.Postformation = createDocument(model.Formation, [
    'titre', 'presentation', 'admission', 'parcours', 'parcoursImage'
]);
exports.Postrealisation = createDocument(model.Realisation, [
    'titre', 'annee', 'description'
]);
exports.Postactualite = createDocument(model.Actualite, [
    'titre', 'description', 'semaine'
]);

/**-------------------API PUT */
exports.Updatemission = updateDocument(model.Mission, ['Description', 'Image']);
exports.Updatepresentation = updateDocument(model.Presentation, ['Description', 'Image']);
exports.Updatehistorique = updateDocument(model.Historique, ['Description', 'Image']);
exports.Updateenseignant = updateDocument(model.Enseignant, [
    'nomComplet', 'adresseMail', 'telephone', 'domainesExpertise', 
    'grade' ,'responsabilite', 'imageProfil'
]);
exports.Updateformation = updateDocument(model.Formation, [
    'titre', 'presentation', 'admission', 'parcours', 'parcoursImage'
]);
exports.Updaterealisation = updateDocument(model.Realisation, [
    'titre', 'annee', 'description'
]);
exports.Updateactualite = updateDocument(model.Actualite, [
    'titre', 'description', 'semaine'
]);

/**-------------------API PATCH (Update activated) */
exports.ActivateMission = updateIsActive(model.Mission);
exports.ActivatePresentation = updateIsActive(model.Presentation);
exports.ActivateHistorique = updateIsActive(model.Historique);
exports.ActivateEnseignant = updateIsActive(model.Enseignant);
exports.ActivateFormation = updateIsActive(model.Formation);
exports.ActivateRealisation = updateIsActive(model.Realisation);
exports.ActivateActualite = updateIsActive(model.Actualite);
exports.ActivateOrganisation = updateIsActive(model.Organisation);





