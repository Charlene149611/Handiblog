// Vérifie si l'utilisateur est authentifié
export function isAuthenticated(req, res, next) {
  if (req.session.user) { 
    return next();
  }
  return res.redirect("/auth/login");
}

// Vérifie que l'utilisateur a un rôle spécifique (admin, modérateur, rédacteur, lecteur)
export function requireRole(role) {
  return function (req, res, next) {
    if (req.session.user && req.session.user.role === role) {
      return next();
    }
    return res.status(403).send("Accès interdit : rôle insuffisant.");
  };
}