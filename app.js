import express from "express";
import "dotenv/config";
import articlesRoutes from './routes/articlesRoutes.js'
import homeRoutes from './routes/homeRoutes.js'
import usersRoutes from './routes/usersRoutes.js'
import cookieParser from "cookie-parser";

// Création du serveur
const app = express();

// Définition du moteur de template
app.set('view engine', 'twig')
app.set('views', './views')

// Middlewares
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Points d'entrée
app.use('/', homeRoutes)
app.use('/auth', usersRoutes)
app.use('/articles', articlesRoutes)

// Lancement du serveur
const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
    console.log(`Le serveur a démarré à l'adresse http://localhost:${PORT}`);
});
