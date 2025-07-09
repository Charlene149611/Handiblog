import * as Articles from "../models/articlesModel.js"; // Import the articles model

export const creerArticle = async (req, res) => {
    const { title, content, category, user_id } = req.body;
    const image_url = req.file ? req.file.path : null;
    const created_at = new Date();
    try {
        await Articles.createArticle(
            title,
            content,
            category,
            user_id,
            image_url,
            created_at
        );
        res.status(201).json("Article créé");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export async function listerArticles(req, res) {
    const [articles] = await Articles.getAllArticles();

    if (!articles)
        return res.status(404).json({ error: "Aucun article trouvé" });

    res.status(200).json(articles);
}

export const obtenirArticle = async (req, res) => {
    const { id } = req.params;
    const [articles] = await Articles.getArticleById(id);

    if (!articles) return res.status(404).json({ error: "Article non trouvé" });

    res.status(200).json(articles[0]);
};

export const actualiserArticle = async (req, res) => {
    const { id } = req.params;
    const { title, content, category, user_id } = req.body;
    const image_url = req.file ? req.file.path : null;
    const verified = false;
    const created_at = new Date();
    try {
        await Articles.updateArticle(
            id,
            title,
            content,
            category,
            user_id,
            image_url,
            verified,
            created_at
        );
        res.status(201).json("Article modifié");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
