const mongoose = require('mongoose');

// Utilisez la variable d'environnement MONGO_URL ou une URL par défaut
const MONGODB_URI = process.env.MONGO_URL || 'mongodb://mongo:27017/DEPARTEMENT_BD';

// Fonction de connexion à MongoDB
async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connexion à MongoDB réussie !');
    } catch (error) {
        console.error('Erreur de connexion à MongoDB :', error);
    }
}

// Exportez la fonction de connexion pour l'utiliser ailleurs dans votre application
module.exports = connectDB;
