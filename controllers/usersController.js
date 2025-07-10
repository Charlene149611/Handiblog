import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  findUserByEmail,
  createUser,
  updateUserPartial,
  deleteUser as deleteUserFromModel,
  getAllUsers,
} from "../models/usersModel.js";

// Affiche le formulaire d'inscription
export function showRegisterForm(req, res) {
  res.render("register", { error: null, success: null });
}

// Traite l'inscription d'un nouvel utilisateur
export async function register(req, res) {
  const { username, email, password, confirmPassword, role } = req.body;

  if (!username || !email || !password || !confirmPassword) {
    return res.render("register", {
      error: "Tous les champs sont requis.",
      success: null,
    });
  }

  if (password !== confirmPassword) {
    return res.render("register", {
      error: "Les mots de passe ne correspondent pas.",
      success: null,
    });
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res.render("register", {
      error: "Un utilisateur avec cet email existe déjà.",
      success: null,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await createUser(username, email, hashedPassword, role || "lecteur");

  res.render("login", {
    error: null,
    success: "Inscription réussie. Vous pouvez maintenant vous connecter.",
  });
}

// Affiche le formulaire de connexion
export function showLoginForm(req, res) {
  res.render("login", { error: null, success: null });
}

// Traite la connexion
export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render("login", {
      error: "Tous les champs sont requis.",
      success: null,
    });
  }

  const user = await findUserByEmail(email);
  if (!user) {
    return res.render("login", {
      error: "Email ou mot de passe incorrect.",
      success: null,
    });
  }

  const match = await bcrypt.compare(password, user.hashedPassword);
  if (!match) {
    return res.render("login", {
      error: "Email ou mot de passe incorrect.",
      success: null,
    });
  }

  // Crée un token JWT pour l'utilisateur
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // Le token expire après 1 heure
  );

  // Envoi du token dans un cookie sécurisé
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 3600000, // 1 heure
  });

  res.redirect("/auth/profile");
}

// Déconnexion
export function logout(req, res) {
  res.clearCookie("token"); // Efface le cookie JWT
  res.redirect("/auth/login");
}

// Affiche le profil de l'utilisateur connecté
export function showProfile(req, res) {
  const user = req.user;
  if (!user) {
    return res.redirect("/auth/login");
  }
  res.render("profile", { user });
}

// Met à jour les infos du profil
export async function updateProfile(req, res) {
  const user = req.user;
  if (!user) {
    return res.redirect("/auth/login");
  }

  const { username, email, role } = req.body;

  if (!username && !email && !role) {
    return res.render("profile", {
      user,
      error: "Au moins un champ doit être modifié.",
    });
  }

  try {
    if (email && email !== user.email) {
      const existingUser = await findUserByEmail(email);
      if (existingUser && existingUser.id !== user.id) {
        return res.render("profile", {
          user,
          error: "Cet email est déjà utilisé par un autre compte.",
        });
      }
    }

    await updateUserPartial(user.id, {
      username: username || null,
      email: email || null,
      role: role || null,
    });

    if (username) user.username = username;
    if (email) user.email = email;
    if (role) user.role = role;

    res.render("profile", { user, success: "Profil mis à jour avec succès." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil:", error);
    res.render("profile", {
      user,
      error: "Erreur lors de la mise à jour du profil.",
    });
  }
}

// Supprime le compte utilisateur connecté
export async function deleteAccount(req, res) {
  const user = req.user;
  if (!user) {
    return res.redirect("/auth/login");
  }

  try {
    await deleteUserFromModel(user.id);
    res.clearCookie("token"); // Efface le cookie JWT
    res.redirect("/auth/register");
  } catch (error) {
    console.error("Erreur lors de la suppression du compte :", error);
    res.render("profile", {
      user,
      error: "Erreur lors de la suppression du compte.",
    });
  }
}

// Supprime un utilisateur par son ID (admin)
export async function deleteUser(req, res) {
  const userId = req.params.id;

  try {
    await deleteUserFromModel(userId);
    res.status(200).json({ message: "Utilisateur supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error);
    res.status(500).json({ error: "Erreur serveur." });
  }
}

// Modifie un utilisateur (admin)
export async function modifyUser(req, res) {
  const userId = req.params.id;
  const { username, email, role } = req.body;

  try {
    await updateUserPartial(userId, {
      username: username || null,
      email: email || null,
      role: role || null,
    });

    res.status(200).json({ message: "Utilisateur modifié avec succès." });
  } catch (error) {
    console.error("Erreur lors de la modification de l'utilisateur :", error);
    res.status(500).json({ error: "Erreur serveur." });
  }
}

// Liste tous les utilisateurs
export async function listUsers(req, res) {
  try {
    const users = await getAllUsers();
    res.render("users/list", { users });
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    res.status(500).send("Erreur serveur");
  }
}
