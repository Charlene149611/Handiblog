// authController.js (version améliorée et organisée)

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  findUserByEmail,
  findUserByUsername,
  createUser,
  updateUserPartial,
  deleteUser as deleteUserFromModel,
  getAllUsers,
} from "../models/usersModel.js";

// Middleware : vérifie que l'utilisateur est admin
export function isAdmin(req, res, next) {
  console.log("Rôle utilisateur :", req.user?.role);
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res
    .status(403)
    .json({ error: "Accès interdit. Réservé aux administrateurs." });
}

//-------------------------------------------//
//          INSCRIPTION / CONNEXION          //
//-------------------------------------------//

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

  const existingUsername = await findUserByUsername(username);
  if (existingUsername) {
    return res.render("register", {
      error: "Ce nom d'utilisateur existe déjà.",
      success: null,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Ne permet d'attribuer un rôle autre que "lecteur" que si l'utilisateur connecté est admin
  const assignedRole =
    req.user && req.user.role === "admin" && role ? role : "lecteur";

  const userId = await createUser({
    username,
    email,
    hashedPassword,
    role: assignedRole,
  });
  console.log("Utilisateur créé avec l'ID :", userId);

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
  if (!user || !(await bcrypt.compare(password, user.hashedPassword))) {
    return res.render("login", {
      error: "Email ou mot de passe incorrect.",
      success: null,
    });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 3600000,
  });

  res.json({ message: "Connexion réussie.", token });
}

// Déconnexion
export function logout(req, res) {
  res.clearCookie("token");
  res.json({ message: "Déconnexion réussie." });
}

//-------------------------------------------//
//            GESTION DE PROFIL             //
//-------------------------------------------//

// Affiche le profil utilisateur connecté
export function showProfile(req, res) {
  const user = req.user;
  if (!user) return res.redirect("/auth/login");
  res.render("profile", { user });
}

// Met à jour le profil utilisateur
export async function updateProfile(req, res) {
  const user = req.user;
  if (!user) return res.json({ error: "Utilisateur non connecté." });

  const { username, email, role } = req.body;

  if (!username && !email && !role) {
    return res.render("profile", {
      user,
      error: "Au moins un champ doit être modifié.",
    });
  }

  if (role && user.role !== "admin") {
    return res.render("profile", {
      user,
      error: "Vous n'avez pas les droits pour modifier votre rôle.",
    });
  }

  if (email && email !== user.email) {
    const existingUser = await findUserByEmail(email);
    if (existingUser && existingUser.id !== user.id) {
      return res.render("profile", {
        user,
        error: "Cet email est déjà utilisé.",
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

  res.render("profile", {
    user,
    success: "Profil mis à jour avec succès.",
  });
}

// Supprime le compte utilisateur connecté
export async function deleteAccount(req, res) {
  const user = req.user;
  if (!user) return res.json({ error: "Utilisateur non connecté." });

  try {
    await deleteUserFromModel(user.id);
    res.clearCookie("token");
    res.json({ message: "Compte supprimé avec succès." });
  } catch (error) {
    console.error("Erreur suppression compte:", error);
    res.render("profile", {
      user,
      error: "Erreur lors de la suppression du compte.",
    });
  }
}

//-------------------------------------------//
//            FONCTIONNALITÉS ADMIN         //
//-------------------------------------------//

// Supprime un utilisateur (admin uniquement)
export async function deleteUser(req, res) {
  const userId = req.params.id;

  try {
    await deleteUserFromModel(userId);
    res.status(200).json({ message: "Utilisateur supprimé avec succès." });
  } catch (error) {
    console.error("Erreur suppression utilisateur:", error);
    res.status(500).json({ error: "Erreur serveur." });
  }
}

// Modifie un utilisateur (admin uniquement)
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
    console.error("Erreur modification utilisateur:", error);
    res.status(500).json({ error: "Erreur serveur." });
  }
}

// Liste tous les utilisateurs (admin uniquement)
export async function listUsers(req, res) {
  try {
    const users = await getAllUsers();
    //res.render("users/list", { users });
    res.json(users);
  } catch (error) {
    console.error("Erreur récupération utilisateurs:", error);
    res.status(500).send("Erreur serveur");
  }
}
