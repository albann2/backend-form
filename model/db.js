const mongoose = require('mongoose');

// URL de connexion à votre base de données MongoDB
const MONGODB_URI = 'mongodb://127.0.0.1:27017/DEPARTEMENT_BD';

// Fonction de connexion à MongoDB
async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connexion à MongoDB réussie !');
    } catch (error) {
        console.error('Erreur de connexion à MongoDB :', error);
    }
}

// Exportez la fonction de connexion pour l'utiliser ailleurs dans votre application
module.exports = connectDB;
