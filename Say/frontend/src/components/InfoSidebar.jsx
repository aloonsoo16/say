import { Github, Linkedin, TabletSmartphone } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

const InfoSidebar = () => {
  const { authUser, updateProfile, isUpdatingProfile } = useAuthStore();
  const [selectedColor, setSelectedColor] = useState(authUser?.color);

  const handleColorSelect = async (color) => {
    setSelectedColor(color);
    await updateProfile({ newColor: color });
  };

  const colorOptions = ["#0D9488", "#0891B2", "#0284C7"];

  return (
    <div className="h-full w-72 hidden lg:flex flex-col transition-all duration-200 ml-2 space-y-2">
      {/* Parte superior */}
      <div className="h-1/2 space-y-4 overflow-y-auto scrollbar-transparent hover:scrollbar-default scrollbar-thin scrollbar-thumb-buttonColor scrollbar-track-transparent   bg-white flex flex-col p-6  rounded-2xl">
        <div className="flex flex-col space-y-1">
          <h2 className="text-base font-semibold text-gray-800">
            Información de tu usuario
          </h2>
          <span className="text-sm font-semibold text-gray-500">
            Bienvenido!
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <div className="relative">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${selectedColor}30` }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: selectedColor }}
              >
                <span className="text-white font-bold text-2xl">
                  {authUser?.fullName.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          <div className="space-x-1 flex flex-nowrap">
            <span className="text-gray-500 text-sm font-semibold">Nombre:</span>
            <span className="text-sm font-semibold text-gray-800 truncate">
              {authUser?.fullName}
            </span>
          </div>
          <div className="space-x-1 flex flex-nowrap">
            <span className="text-gray-500 text-sm font-semibold">Email:</span>
            <span className="text-sm font-semibold text-gray-800">
              {authUser?.email}
            </span>
          </div>
          <div className="space-x-1 flex flex-nowrap">
            <span className="text-gray-500 text-sm font-semibold">
              Estado de tu cuenta:
            </span>
            <span className="text-sm font-semibold text-green-400">Activa</span>
          </div>
          <div className="space-x-1 flex flex-nowrap">
            <span className="text-gray-500 text-sm font-semibold">
              Miembro desde:
            </span>
            <span className="text-sm font-semibold text-gray-800">
              {authUser?.createdAt?.split("T")[0]}
            </span>
          </div>
        </div>

        <div className="flex flex-col space-y-1 gap-2">
          <h2 className="text-sm font-semibold text-gray-800">
            ¿Quieres modificar tu perfil?
          </h2>
          <p className="text-sm text-gray-500 font-semibold">
            {isUpdatingProfile ? "Actualizando..." : "Selecciona un color"}
          </p>
          <div className="flex gap-4">
            {colorOptions.map((color) => (
              <button
                key={color}
                className={`w-5 h-5 rounded-full cursor-pointer ${
                  selectedColor === color ? "ring-2 ring-gray-800" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
                disabled={isUpdatingProfile}
              ></button>
            ))}
          </div>
        </div>
      </div>

      {/* Parte inferior */}
      <div className="h-1/2 overflow-y-auto scrollbar-transparent hover:scrollbar-default scrollbar-thin scrollbar-thumb-buttonColor scrollbar-track-transparent space-y-4 bg-indigo-200 flex flex-col p-6 rounded-2xl">
        <div className="flex flex-col space-y-1">
          <h2 className="text-base font-semibold text-gray-800">
            Detalles del proyecto
          </h2>
          <span className="text-sm font-semibold text-gray-500">
            Desarrollado por Alonso Mangas
          </span>
        </div>

        <h2 className="text-base font-semibold mb-4 text-gray-800">
          Tecnologías utilizadas
        </h2>
        <div className="flex flex-wrap gap-2">
          {[
            "Nodejs",
            "Express",
            "Socket.io",
            "Vite + React",
            "Tailwindcss",
            "MongoDB",
          ].map((tech) => (
            <div
              key={tech}
              className="px-4 py-2 rounded-2xl text-sm font-semibold bg-white text-gray-800"
            >
              {tech}
            </div>
          ))}
        </div>
        <div className="mt-6">
          <h2 className="text-base font-semibold mb-4 text-gray-800">
            Redes de contacto
          </h2>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/alonsomangas/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-12 h-12 rounded-full text-gray-800 bg-white flex items-center justify-center">
                <Linkedin className="size-4 lg:size-5" />
              </div>
            </a>
            <a
              href="https://github.com/aloonsoo16"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-12 h-12 rounded-full text-gray-800 bg-white flex items-center justify-center">
                <Github className="size-4 lg:size-5" />
              </div>
            </a>
            <a
              href="https://portfolio.alonso16.dev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-12 h-12 text-gray-800 rounded-full bg-white flex items-center justify-center">
                <TabletSmartphone className="size-4 lg:size-5" />
              </div>
            </a>
          </div>
        </div>
        <div>
          <p className="text-gray-500 text-sm font-semibold">
            Agradezo apoyo y sugerencias!
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoSidebar;
