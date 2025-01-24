import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Inautorizado - Token no proporcionado" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Inautorizado - Token inválido" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Error en protectRoute middleware:", error.message);
    return res.status(500).json({ error: "Error en el servidor interno" });
  }
};
