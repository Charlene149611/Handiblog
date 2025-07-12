import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); // Charge les variables d'environnement

// Middleware pour vérifier le token JWT
export function protect(req, res, next) {
  console.log("Vérification du token JWT");

  // Récupère le token dans l'en-tête Authorization OU dans les cookies
  const authHeader = req.headers["authorization"];
  const tokenFromHeader = authHeader?.split(" ")[1];
  const tokenFromCookie = req.cookies?.token;
  const token = tokenFromHeader || tokenFromCookie;

  if (!token) {
    return res.status(401).json({ message: "Token requis" });
  }

  // Vérifie le token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error("Token invalide ou expiré", err);
      return res.status(403).json({ message: "Token invalide" });
    }

    req.user = user; // Ajoute l'utilisateur décodé à la requête
    console.log("Token vérifié avec succès", user);
    next();
  });
}

// Vérifie que l'utilisateur a un rôle spécifique (admin, modérateur, etc.)
export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user)
      return res.status(401).json({ message: "Utilisateur non authentifié" });

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Accès refusé" });
    }

    next();
  };
}
