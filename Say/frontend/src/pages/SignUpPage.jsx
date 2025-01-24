import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    color: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const colorOptions = ["#0D9488", "#0891B2", "#0284C7"];

  const validateForm = () => {
    if (!formData.fullName.trim())
      return toast.error("El nombre de usuario es requerido");
    if (!formData.email.trim()) return toast.error("El email es requerido");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Formato inválido en el email");
    if (!formData.password) return toast.error("La contraseña es requerida");
    if (formData.password.length < 6)
      return toast.error(
        "La contraseña debe de tener por lo menos 6 caracteres"
      );
    if (!formData.confirmPassword)
      return toast.error("Debes confirmar tu contraseña");
    if (formData.password !== formData.confirmPassword)
      return toast.error("Las contraseñas no coinciden");
    if (!formData.color.trim())
      return toast.error("Debes elegir un color para tu usuario");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-indigo-100 text-gray-800 font-semibold text-sm">
      <div className="w-full flex flex-col justi-center items-center space-y-8">
        {/* Encabezado de la página */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-800 flex items-center justify-center">
            <MessageSquare className="size-6 lg:size-8" />
          </div>
          <h1 className="text-2xl font-bold mt-2 text-gray-800">
            Crea tu cuenta
          </h1>
          <p className="text-gray-500 font-semibold text-sm">
            Comienza con tu cuenta gratuita
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-indigo-200 p-6 rounded-2xl w-70 md:w-80"
        >
          {/* Campo de Nombre */}
          <div>
            <label className="label">
              <span className=" font-semibold text-sm text-gray-500">
                Nombre completo
              </span>
            </label>
            <input
              type="text"
              className="rounded-lg bg-gray-100 text-gray-800 text-sm font-semibold w-full placeholder-gray-500 px-4 py-2 focus:outline-none border border-transparent"
              placeholder="Usuario Ejemplo"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
          </div>

          {/* Campo de Email */}
          <div>
            <label className="label">
              <span className="font-semibold text-sm text-gray-500">Email</span>
            </label>
            <input
              type="email"
              className="rounded-lg bg-gray-100 text-gray-800 text-sm font-semibold w-full placeholder-gray-500 px-4 py-2 focus:outline-none border border-transparent"
              placeholder="usuario@ejemplo.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          {/* Campo de Contraseña */}
          <div>
            <label className="label">
              <span className="font-semibold text-sm text-gray-500">
                Contraseña
              </span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="rounded-lg bg-gray-100 text-gray-800 text-sm font-semibold w-full placeholder-gray-500 px-4 py-2 focus:outline-none border border-transparent"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className=" text-gray-500 size-4 lg:size-5" />
                ) : (
                  <Eye className="text-gray-500 size-4 lg:size-5" />
                )}
              </button>
            </div>
          </div>

          {/* Campo para Confirmar Contraseña */}
          <div>
            <label className="label">
              <span className=" font-semibold text-gray-500 text-sm">
                Confirmar Contraseña
              </span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="rounded-lg bg-gray-100 text-gray-800 text-sm font-semibold w-full placeholder-gray-500 px-4 py-2 focus:outline-none border border-transparent"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className=" text-gray-500 size-4 lg:size-5" />
                ) : (
                  <Eye className="text-gray-500 size-4 lg:size-5" />
                )}
              </button>
            </div>
          </div>

          {/* Campo de Selección de Color */}
          <div>
            <label className="block text-sm text-gray-500 font-semibold mb-4">
              Elige un color para tu usuario:
            </label>

            <div className="flex justify-start items-center space-x-4 mb-4">
              {colorOptions.map((colorOption, index) => (
                <div
                  key={index}
                  onClick={() =>
                    setFormData({ ...formData, color: colorOption })
                  }
                  className={`w-5 h-5 rounded-full cursor-pointer ${
                    formData.color === colorOption ? "ring-2 ring-gray-100" : ""
                  }`}
                  style={{ backgroundColor: colorOption }}
                />
              ))}
            </div>
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            className="w-full bg-gray-800 text-gray-100 font-medium px-4 py-2 rounded-full transition duration-300 mt-auto flex justify-center items-center"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <Loader className="animate-spin size-4 lg:size-5" />
            ) : (
              "Registrarse"
            )}
          </button>
        </form>

        <div className="flex justify-center items-center px-4 md:px-0">
          <p className="text-center text-gray-800 ">
            ¿Ya tienes una cuenta creada?
            <br className="block md:hidden"></br>
            <Link to="/login" className="link ml-1 text-gray-500">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
