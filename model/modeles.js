const mongoose = require('mongoose');

const baseSchemaOptions = {
    timestamps: true
};

// Schéma pour la classe Historique
const HistoriqueSchema = new mongoose.Schema({
    Description: String,
    Image: String,
    activated: { type: Boolean, default: true }
}, baseSchemaOptions);

// Schéma pour la classe Mission
const MissionSchema = new mongoose.Schema({
    Description: String,
    Image: String,
    activated: { type: Boolean, default: true }
}, baseSchemaOptions);

// Schéma pour la classe Presentation
const PresentationSchema = new mongoose.Schema({
    Description: String,
    Image: String,
    activated: { type: Boolean, default: true }
}, baseSchemaOptions);

// Schéma pour la classe Enseignant
const EnseignantSchema = new mongoose.Schema({
    nomComplet: String,
    adresseMail: String,
    telephone: String,
    domainesExpertise:String,
    grade:String,
    responsabilite: String,
    imageProfil: String,
    activated: { type: Boolean, default: true }
}, baseSchemaOptions);

// Schéma pour la classe Formation
const FormationSchema = new mongoose.Schema({
    titre: String,
    presentation: String,
    admission: String,
    parcours: String,
    parcoursImage: String,
    activated: { type: Boolean, default: true }
}, baseSchemaOptions);

// Schéma pour la classe Realisation
const RealisationSchema = new mongoose.Schema({
    titre: String,
    annee: String,
    description: String,
    activated: { type: Boolean, default: true }
}, baseSchemaOptions);

// Schéma pour la classe Actualite
const ActualiteSchema = new mongoose.Schema({
    titre: String,
    description: String,
    semaine: String,
    activated: { type: Boolean, default: true }
}, baseSchemaOptions);

// Schéma pour la classe Organisation
const OrganisationSchema = new mongoose.Schema({
    programmePedagogique: String,
    planCours: {
        annee: String,
        image: String,
        niveau: String,
        filiere: String
    },
    activated: { type: Boolean, default: true }
}, baseSchemaOptions);

// Création des modèles
const Historique = mongoose.model('Historique', HistoriqueSchema);
const Mission = mongoose.model('Mission', MissionSchema);
const Presentation = mongoose.model('Presentation', PresentationSchema);
const Enseignant = mongoose.model('Enseignant', EnseignantSchema);
const Formation = mongoose.model('Formation', FormationSchema);
const Realisation = mongoose.model('Realisation', RealisationSchema);
const Actualite = mongoose.model('Actualite', ActualiteSchema);
const Organisation = mongoose.model('Organisation', OrganisationSchema);

module.exports = { Historique, Mission, Presentation, Enseignant, Formation, Realisation, Actualite, Organisation };
