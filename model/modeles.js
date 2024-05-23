const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Définir le schéma de l'utilisateur
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
});

// Avant de sauvegarder l'utilisateur, hasher le mot de passe
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Méthode pour vérifier le mot de passe
userSchema.methods.isValidPassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
};








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
    Description: String,
    semaine: String,
    activated: { type: Boolean, default: true }
}, baseSchemaOptions);

// Schéma pour la classe Organisation


// Création des modèles
const Historique = mongoose.model('Historique', HistoriqueSchema);
const Mission = mongoose.model('Mission', MissionSchema);
const Presentation = mongoose.model('Presentation', PresentationSchema);
const Enseignant = mongoose.model('Enseignant', EnseignantSchema);
const Formation = mongoose.model('Formation', FormationSchema);
const Realisation = mongoose.model('Realisation', RealisationSchema);
const Actualite = mongoose.model('Actualite', ActualiteSchema);
const User = mongoose.model('User', userSchema);


module.exports = { Historique, Mission, Presentation, Enseignant, Formation, Realisation, Actualite ,User};
