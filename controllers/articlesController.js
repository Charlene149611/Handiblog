import * as Articles from '../models/articlesModel.js'; // Import the articles model

// Contrôleur : fonction qui est appelée lors de la requête pour afficher la liste des articles
// Elle récupère les articles depuis le modèle et les passe à la vue pour affichage 
export async function listArticles(req, res) {
    try {
        const articles = await Articles.getAllArticles();
        res.render('articles/list', { articles });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur serveur');
    }
}
