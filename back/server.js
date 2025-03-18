const express = require('express');
const connectDB = require('./config/mongo'); // Import de la connexion MongoDB
require('dotenv').config();
const UsersRouter = require('./routes/users');

const app = express();

connectDB();

app.use(express.json());

app.use("/api/users", UsersRouter)

app.get('/', (req, res) => {
    res.send('🚀 API en cours d\'exécution...');
});

// Démarrer le serveur
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`✅ Serveur lancé sur http://localhost:${PORT}`));