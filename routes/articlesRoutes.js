import express from 'express';
import { listerArticles, obtenirArticle, creerArticle, actualiserArticle, supprimerArticle } from '../controllers/articlesController.js';

const router = express.Router();

router.get('/', listerArticles);
router.get('/:id', obtenirArticle);
router.post('/', creerArticle);
router.put('/:id', actualiserArticle);
router.delete('/:id', supprimerArticle);

export default router;