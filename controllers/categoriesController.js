import * as Categories from "../models/categoriesModel.js"; // Import the categories model

// Create
export const creerCategorie = async (req, res) => {
    try {
        const { titre } = req.body;
        if (!titre) {
            return res
                .status(400)
                .json({ error: "Le champ 'titre' est requis" });
        }

        await Categories.createCategory(titre);
        res.status(201).json({ message: "Catégorie créée" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Read
export async function listerCategories(req, res) {
    const categories = await Categories.getAllCategories();

    if (!categories.length)
        return res.status(404).json({ error: "Aucune catégorie trouvée" });

    res.status(200).json(categories);
}

export const obtenirCategorie = async (req, res) => {
    const { id } = req.params;
    const category = await Categories.getCategoryById(id);

    if (!category)
        return res.status(404).json({ error: "Catégorie non trouvée" });

    res.status(200).json(category);
};

// Update
export const actualiserCategorie = async (req, res) => {
    try {
        const { id } = req.params;
        const { titre } = req.body;

        // Vérifier si la catégorie existe
        const category = await Categories.getCategoryById(id);
        if (!category) {
            return res.status(404).json({ error: "Catégorie non trouvée" });
        }

        const changedRows = await Categories.updateCategory({
            id,
            titre,
        });
        res.status(201).json({
            message: `${changedRows} catégorie(s) modifiée(s)`,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete
export const supprimerCategorie = async (req, res) => {
    try {
        const { id } = req.params;

        // Vérifier si la catégorie existe
        const category = await Categories.getCategoryById(id);
        if (!category) {
            return res.status(404).json({ error: "Catégorie non trouvée" });
        }

        const deletedRows = await Categories.deleteCategory(id);
        res.status(200).json({
            message: `${deletedRows} catégorie(s) supprimée(s)`,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
