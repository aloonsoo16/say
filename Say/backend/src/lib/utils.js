import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, //Milisegundos
    httpOnly: true, //Prevenir ataques XSS cross-site encriptados
    sameSite: "Strict", //Ataques CSRF cross-site request forgery atacks
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};


