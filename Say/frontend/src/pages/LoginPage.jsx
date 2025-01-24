import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    color: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-indigo-100 text-black font-semibold text-sm">
      <div className="w-full flex flex-col justi-center items-center space-y-8 ">
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-800 flex items-center justify-center">
            <MessageSquare className="size-6 lg:size-8"  />
          </div>
          <h1 className="text-2xl font-bold mt-2 text-gray-800">
            Inicia sesión
          </h1>
          <p className="text-gray-500 font-semibold text-sm">
            Inicia sesión en tu cuenta
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-indigo-200 p-6 rounded-2xl w-70 md:w-80"
        >
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

          <div className="pb-4">
            <label className="label">
              <span className=" font-semibold text-sm text-gray-500">
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
                  <EyeOff className=" text-gray-50 size-4 lg:size-5"  />
                ) : (
                  <Eye className="text-gray-500 size-4 lg:size-5"  />
                )}
              </button>
            </div>
          </div>

          <div className="pb-4">
            <button
              type="submit"
              className="w-full bg-gray-800  text-gray-100 font-semibold px-4 py-2 rounded-full transition duration-300 mt-auto flex justify-center items-center"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <Loader className="animate-spin size-4 lg:size-5"  />
              ) : (
                "Iniciar sesión"
              )}
            </button>
          </div>
        </form>

        <div className="flex justify-center items-center px-4 md:px-0">
          <p className="text-center text-gray-800 font-semibold">
            ¿No tienes una cuenta creada?
            <br className="block md:hidden"></br>
            <Link
              to="/signup"
              className="link ml-1 text-gray-500 font-semibold"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
