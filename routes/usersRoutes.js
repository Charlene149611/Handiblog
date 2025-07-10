import express from "express";

// Import des contrôleurs
import {
  showLoginForm,
  login,
  showRegisterForm,
  register,
  showProfile,
  updateProfile,
  logout,
  deleteAccount,
  listUsers,
  modifyUser,
  deleteUser,
} from "../controllers/usersController.js";

// Import des middlewares pour protéger les routes
import {
  isAuthenticated,
  requireRole,
  protect,
} from "../middlewares/authMiddleware.js";

// Création du routeur Express
const router = express.Router();

// --- Authentification ---
// Affiche le formulaire de connexion
router.get("/login", showLoginForm);
// Traite la soumission du formulaire de connexion
router.post("/login", login);

// Affiche le formulaire d'inscription
router.get("/register", showRegisterForm);
// Traite la soumission du formulaire d'inscription
router.post("/register", register);

// Déconnecte l'utilisateur
router.get("/logout", logout);

// --- Profil utilisateur (protégé par authentification) ---
// Affiche la page de profil uniquement si l'utilisateur est connecté
router.get("/profile", protect, showProfile);
// Met à jour le profil (nom, email...) uniquement si connecté
router.post("/profile", protect, updateProfile);

// --- Modification d'un utilisateur ---
router.put("/modify/:id", protect, modifyUser);

// --- Suppression d'un utilisateur ---
router.delete("/delete/:id", protect, deleteUser);

// --- Suppression du compte (protégée) ---
// Supprime le compte de l'utilisateur connecté
router.delete("/delete", protect, deleteAccount);

// --- Liste des utilisateurs (réservée aux admins) ---
// Affiche tous les utilisateurs (accessible uniquement si rôle admin)
router.get("/users", requireRole("admin"), listUsers);

// Export du routeur pour l'utiliser dans app.js
export default router;
