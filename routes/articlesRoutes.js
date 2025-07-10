import express from 'express';
import { listerArticles, obtenirArticle, creerArticle, actualiserArticle, supprimerArticle } from '../controllers/articlesController.js';
import {upload} from '../middlewares/upload.js'

const router = express.Router();

router.get('/', listerArticles);
router.get('/:id', obtenirArticle);
router.post('/', upload.single('image'), creerArticle);
router.put('/:id', upload.single('image'), actualiserArticle);
router.delete('/:id', supprimerArticle);

export default router;