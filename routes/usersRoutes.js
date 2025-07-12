import express from "express";

// Import des contrôleurs utilisateurs
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

// Import des middlewares
import { protect } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../controllers/usersController.js";

// Création du routeur Express
const router = express.Router();

//-------------------------------------------//
//           AUTHENTIFICATION               //
//-------------------------------------------//

// Affiche le formulaire de connexion
router.get("/login", showLoginForm);
// Traite la connexion
router.post("/login", login);

// Affiche le formulaire d'inscription
router.get("/register", showRegisterForm);
// Traite l'inscription
router.post("/register", register);

// Déconnecte l'utilisateur
router.get("/logout", logout);

//-------------------------------------------//
//              PROFIL UTILISATEUR          //
//-------------------------------------------//

// Affiche le profil (nécessite d'être connecté)
router.get("/profile", protect, showProfile);
// Met à jour le profil (nom, email...)
router.post("/profile", protect, updateProfile);

// Supprime le compte de l'utilisateur connecté
router.delete("/delete", protect, deleteAccount);

//-------------------------------------------//
//            FONCTIONNALITÉS ADMIN         //
//-------------------------------------------//

// Liste tous les utilisateurs (admin uniquement)
router.get("/users", protect, isAdmin, listUsers);

// Modifie un utilisateur par son ID (admin uniquement)
router.put("/modify/:id", protect, isAdmin, modifyUser);

// Supprime un utilisateur par son ID (admin uniquement)
router.delete("/delete/:id", protect, isAdmin, deleteUser);

// Export du routeur pour utilisation dans app.js
export default router;
