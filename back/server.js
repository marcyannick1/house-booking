const express = require('express');
const connectDB = require('./config/mongo'); // Import de la connexion MongoDB
require('dotenv').config();
const UsersModel = require('./models/users');

const app = express();

connectDB();

const seedDB = async () => {
    await UsersModel.create({
        title: 'Appartement cosy en centre-ville',
        description: 'Un superbe appartement idéalement situé.',
        pricePerNight: 80
    }, );

    console.log('✅ Données insérées avec succès !');
};

seedDB();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('🚀 API en cours d\'exécution...');
});

// Démarrer le serveur
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`✅ Serveur lancé sur http://localhost:${PORT}`));