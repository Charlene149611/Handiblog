import * as Categories from "../models/categoriesModel.js"; // Import the categories model

// Create
export const creerCategorie = async (req, res) => {
    const { titre } = req.body;
    try {
        await Categories.createCategory(titre);
        res.status(201).json({ message: "Catégorie créée" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Read
export async function listerCategories(req, res) {
    const categories = await Categories.getAllCategories();

    if (!categories)
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
    const { id } = req.params;
    const { titre } = req.body;
    try {
        const changedRows = await Categories.updateCategory({
            id,
            titre,
        });
        res.status(201).json({
            message: `Nbre de catégories modifiées : ${changedRows}`,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete
export const supprimerCategorie = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRows = await Categories.deleteCategory(id);
        res.status(200).json({
            message: `Nbre de catégories supprimées : ${deletedRows}`,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
