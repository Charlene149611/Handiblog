import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); // Charge les variables d'environnement

// Middleware pour vérifier le token JWT
export function protect(req, res, next) {
  console.log("Vérification du token JWT");

  // Récupère le token dans l'en-tête Authorization OU dans les cookies
  const authHeader = req.headers.authorization;
  const token =
    authHeader?.split(" ")[1] || req.cookies?.token || req.body?.token;

  if (!token) {
    return res.status(401).json({ message: "Token requis" });
  }

  // Vérifie le token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Token invalide" });
    }

    req.user = decoded; // Ajoute l'utilisateur décodé à la requête
    console.log("Token vérifié avec succès");
    next();
  });
}

// Vérifie si l'utilisateur est connecté
export function isAuthenticated(req, res, next) {
  if (req.user) {
    return next();
  }
  return res.redirect("/auth/login");
}

// Vérifie que l'utilisateur a un rôle spécifique (admin, modérateur, etc.)
export function requireRole(role) {
  return function (req, res, next) {
    if (req.user && req.user.role === role) {
      return next();
    }
    return res.status(403).send("Accès interdit : rôle insuffisant.");
  };
}
