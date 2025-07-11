import * as Articles from "../models/articlesModel.js"; // Import the articles model

export const creerArticle = async (req, res) => {
    const { title, content, category_id, user_id } = req.body;
    const image_url = req.file ? req.file.path : null;
    const created_at = new Date();
    try {
        await Articles.createArticle({
            title,
            content,
            category_id,
            user_id,
            image_url,
            created_at,
        });
        res.status(201).json({ message: "Article créé" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export async function listerArticles(req, res) {
    const articles = await Articles.getAllArticles();

    if (!articles)
        return res.status(404).json({ error: "Aucun article trouvé" });

    res.status(200).json(articles);
}

export const obtenirArticle = async (req, res) => {
    const { id } = req.params;
    const article = await Articles.getArticleById(id);

    if (!article) return res.status(404).json({ error: "Article non trouvé" });

    res.status(200).json(article);
};

export const actualiserArticle = async (req, res) => {
    const { id } = req.params;
    const { title, content, category_id, user_id } = req.body;
    const image_url = req.file ? req.file.path : null;
    const verified = false;
    const created_at = new Date();
    try {
        const changedRows = await Articles.updateArticle({
            id,
            title,
            content,
            category_id,
            user_id,
            image_url,
            verified,
            created_at,
        });
        res.status(201).json({
            message: `Nbre d'articles modifiés : ${changedRows}`,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const supprimerArticle = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRows = await Articles.deleteArticle(id);
        res.status(200).json({
            message: `Nbre d'articles supprimés : ${deletedRows}`,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
