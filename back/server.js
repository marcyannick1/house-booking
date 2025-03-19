const express = require('express');
const connectDB = require('./config/mongo'); // Import de la connexion MongoDB
require('dotenv').config();

const UsersRouter = require('./routes/users');
const PropertiesRouter = require('./routes/properties');
const ReservationsRouter = require('./routes/reservations');
const ReviewsRouter = require('./routes/reviews');
const FavoritesRouter = require('./routes/favorites');
const AuthRouter = require('./routes/auth');


const app = express();

connectDB();

app.use(express.json());

app.use("/api/users", UsersRouter)
app.use("/api/properties", PropertiesRouter)
app.use("/api/reservations", ReservationsRouter)
app.use("/api/reviews", ReviewsRouter)
app.use("/api/favorites", FavoritesRouter)
app.use("/api/auth", AuthRouter)

app.get('/', (req, res) => {
    res.send('🚀 API en cours d\'exécution...');
});

// Démarrer le serveur
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`✅ Serveur lancé sur http://localhost:${PORT}`));