import express from "express";
import {
    creerCategorie,
    listerCategories,
    obtenirCategorie,
    actualiserCategorie,
    supprimerCategorie,
} from "../controllers/categoriesController.js";

const router = express.Router();

// Create
router.post("/", creerCategorie);

// Read
router.get("/", listerCategories);
router.get("/:id", obtenirCategorie);

// Update
router.put("/:id", actualiserCategorie);

// Delete
router.delete("/:id", supprimerCategorie);

export default router;
