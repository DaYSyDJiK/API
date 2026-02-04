const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require("dotenv").config();

const app = express();

// Routes
const indexRouter = require("./routes/indexRoutes");
const userRoutes = require('./routes/userRoutes');
const authRoutes = require("./routes/authRoutes");
const catwayRoutes = require("./routes/catwayRoutes");
const catwayPagesRoutes = require("./routes/catwayPagesRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const reservationPagesRoutes = require("./routes/reservationPagesRoutes");


const session = require("express-session");

// Moteur de template + dossier views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Connecté à MongoDB"))
.catch((err) => console.error("Erreur MongoDB :", err));


// Middlewares
app.use(express.json()); // pour API JSON (Postman)
app.use(express.urlencoded({ extended: true })); // pour formulaires HTML (EJS)
const private = require("./middlewares/private"); 

app.use(
  session({
    secret: "CHANGE_MOI_EN_SECRET",
    resave: false,
    saveUninitialized: false
  })
);

// Routes AUTH
app.use(authRoutes);

// Fichiers statiques (css, images…)
app.use(express.static('public'));

// Routes FRONT (vues)
app.use("/", indexRouter);
app.use("/users", userRoutes);
app.use("/catways-page", catwayPagesRoutes);
app.use("/reservations-page", reservationPagesRoutes);

// Routes API
app.use("/api/users", private, userRoutes);
app.use("/catways", private, catwayRoutes);
app.use("/catways/:id/reservations", private, reservationRoutes);



// Middleware d'erreur 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur serveur' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Le serveur tourne sur le port ${PORT}`));
