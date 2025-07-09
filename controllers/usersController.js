import bcrypt from "bcrypt";
import {
  findUserByEmail,
  createUser,
  updateUserPartial,
  deleteUser,
  getAllUsers,
} from "../models/usersModel.js";

// Affiche le formulaire d'inscription
export function showRegisterForm(req, res) {
  res.render("register", { error: null, success: null });
}

// Traite l'inscription d'un nouvel utilisateur
export async function register(req, res) {
  const { username, email, password, confirmPassword, role } = req.body;

  // Vérifie que tous les champs sont remplis
  if (!username || !email || !password || !confirmPassword) {
    return res.render("register", {
      error: "Tous les champs sont requis.",
      success: null,
    });
  }

  // Vérifie que les deux mots de passe sont identiques
  if (password !== confirmPassword) {
    return res.render("register", {
      error: "Les mots de passe ne correspondent pas.",
      success: null,
    });
  }

  // Vérifie si l'utilisateur existe déjà par son email
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res.render("register", {
      error: "Un utilisateur avec cet email existe déjà.",
      success: null,
    });
  }

  // Hash du mot de passe et création de l'utilisateur
  const hashedPassword = await bcrypt.hash(password, 10);
  await createUser(username, email, hashedPassword, role || "lecteur");

  // Redirige vers la page de connexion avec un message de succès
  res.render("login", {
    error: null,
    success: "Inscription réussie. Vous pouvez maintenant vous connecter.",
  });
}

// Affiche le formulaire de connexion
export function showLoginForm(req, res) {
  res.render("login", { error: null, success: null });
}

// Traite la connexion de l'utilisateur
export async function login(req, res) {
  const { email, password } = req.body;

  // Vérifie que tous les champs sont remplis
  if (!email || !password) {
    return res.render("login", {
      error: "Tous les champs sont requis.",
      success: null,
    });
  }

  // Recherche de l'utilisateur par email
  const user = await findUserByEmail(email);
  if (!user) {
    return res.render("login", {
      error: "Email ou mot de passe incorrect.",
      success: null,
    });
  }

  // Vérifie que le mot de passe correspond
  const match = await bcrypt.compare(password, user.hashedPassword);
  if (!match) {
    return res.render("login", {
      error: "Email ou mot de passe incorrect.",
      success: null,
    });
  }

  // Connexion réussie (la session peut être activée ici si nécessaire)
  // req.session.user = { id: user.id, email: user.email, role: user.role };
  res.redirect("/"); // Redirige vers la page d'accueil
}

// Déconnecte l'utilisateur
export function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.error("Erreur lors de la déconnexion:", err);
      return res.redirect("/");
    }
    res.redirect("/auth/login");
  });
}

// Affiche le profil de l'utilisateur connecté
export function showProfile(req, res) {
  const user = req.session.user;
  if (!user) {
    return res.redirect("/auth/login");
  }
  res.render("profile", { user });
}

// Met à jour les informations du profil
export async function updateProfile(req, res) {
  const user = req.session.user;
  if (!user) {
    return res.redirect("/auth/login");
  }

  const { username, email, role } = req.body;

  // Vérifie qu'au moins un champ est modifié
  if (!username && !email && !role) {
    return res.render("profile", {
      user,
      error: "Au moins un champ doit être modifié.",
    });
  }

  try {
    // Si l'email est changé, vérifie qu'il n'est pas utilisé par un autre utilisateur
    if (email && email !== user.email) {
      const existingUser = await findUserByEmail(email);
      if (existingUser && existingUser.id !== user.id) {
        return res.render("profile", {
          user,
          error: "Cet email est déjà utilisé par un autre compte.",
        });
      }
    }

    // Mise à jour partielle de l'utilisateur
    await updateUserPartial(user.id, {
      username: username || null,
      email: email || null,
      role: role || null,
    });

    // Met à jour les infos en session
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

// Supprime le compte de l'utilisateur connecté
export async function deleteAccount(req, res) {
  const user = req.session.user;
  if (!user) {
    return res.redirect("/auth/login");
  }
  try {
    await deleteUser(user.id);
    req.session.destroy((err) => {
      if (err) {
        console.error("Erreur lors de la suppression du compte:", err);
        return res.redirect("/auth/profile");
      }
      res.redirect("/auth/register");
    });
  } catch (error) {
    console.error("Erreur lors de la suppression du compte:", error);
    res.render("profile", {
      user,
      error: "Erreur lors de la suppression du compte.",
    });
  }
}

// Affiche une liste de tous les utilisateurs (ex. pour un admin)
export async function listUsers(req, res) {
  try {
    const users = await getAllUsers();
    res.render("users/list", { users });
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs:", error);
    res.status(500).send("Erreur serveur");
  }
}
