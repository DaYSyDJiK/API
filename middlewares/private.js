/**
 * Middleware d'accès privé.
 * Bloque l'accès aux routes protégées si l'utilisateur n'est pas connecté.
 * La connexion est considérée active si `req.session.user` existe.
 *
 * @module middlewares/private
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 * @returns {void} 401 si non connecté, sinon next()
 */

module.exports = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Accès refusé : non connecté" });
  }
  next();
};
