import express from "express";
import "dotenv/config";
import usersRoutes from './routes/usersRoutes.js'

// Création du serveur
const app = express();

// Middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// app.use('/', homeRoutes)
app.use('/auth', usersRoutes)
// app.use('/article', articleRoutes)
// app.use('/articles', articlesRoutes)

// Lancement du serveur
const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
    console.log(`Le serveur a démarré à l'adresse http://localhost:${PORT}`);
});
