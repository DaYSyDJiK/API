const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

const indexRouter = require("./routes/indexRoutes");
const userRoutes = require('./routes/userRoutes');

// Moteur de template + dossier views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/exemple-api', {
  useUnifiedTopology: true,
})
.then(() => console.log('Connecté à MongoDB'))
.catch((err) => console.error('Erreur MongoDB :', err));

// Middlewares
app.use(express.json()); // pour API JSON (Postman)
app.use(express.urlencoded({ extended: true })); // pour formulaires HTML (EJS)

// Fichiers statiques (css, images…)
app.use(express.static('public'));

// Routes FRONT (vues)
app.use("/", indexRouter);
app.use("/users", userRoutes);

// Routes API (si ton userRoutes gère l’API aussi)
app.use("/api/users", userRoutes);

// Middleware d'erreur (à la fin !)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur serveur' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Le serveur tourne sur le port ${PORT}`));
