import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, email, password, color } = req.body;
  try {
    if (!fullName || !email || !password || !color) {
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "La contraseña debe de tener al menos 6 caracteres" });
    }
    const user = await User.findOne({ email });

    if (user)
      res.status(400).json({ message: "El usuario ya está registrado" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      color,
    });

    if (newUser) {
      //generar jwt aqui
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        color: newUser.color,
      });
    } else {
      res.status(400).json({ message: "Datos inválidos" });
    }
  } catch (error) {
    console.error("Error en el controlador de registro", error.message);
    res.status(500).json({ error: "Error en el servidor interno" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "El usuario no existe" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      color: user.color,
    });
  } catch (error) {
    console.error("Error en el controlador de inicio de sesión", error.message);
    res.status(500).json({ error: "Error en el servidor interno" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({ message: "Sesión cerrada correctamente" });
  } catch (error) {
    console.error("Error en el controlador de cierre de sesión", error.message);
    res.status(500).json({ error: "Error en el servidor interno" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { newColor } = req.body;
    const userId = req.user._id;

    if (!newColor) {
      return res
        .status(400)
        .json({ message: "Debes seleccionar un color para actualizarlo" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { color: newColor },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({
      message: "Color actualizado correctamente",
      updatedUser,
    });
  } catch (error) {
    console.error("Error en la actualización del perfil", error.message);
    res.status(500).json({ error: "Error en el servidor interno" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Error en el controlador de checkAuth", error.message);
    res.status(500).json({ error: "Error en el servidor interno" });
  }
};
