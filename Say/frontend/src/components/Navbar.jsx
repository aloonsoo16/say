import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { MessageSquare, MessageCircle, LogOut, X, User } from "lucide-react";
import MobileSidebar from "./MobileSidebar";
import InfoMobileSidebar from "./InfoMobileSidebar";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setItsProfileOpen] = useState(false);

  const toggleProfile = () => {
    setItsProfileOpen((prev) => !prev);
  };

  const closeProfile = () => {
    setItsProfileOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Cerrar automaticamente el sidebar de conctos de movil cuando estamos en pantallas lg o mas
  useEffect(() => {
    const handleResizeProfile = () => {
      if (window.innerWidth >= 1024) {
        setItsProfileOpen(false);
      }
    };

    window.addEventListener("resize", handleResizeProfile);
    return () => {
      window.removeEventListener("resize", handleResizeProfile);
    };
  }, []);

  // Cerrar automaticamente el sidebar de perfil de movil cuando estamos en pantallas lg o mas
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row lg:flex-col bg-black lg:rounded-tr-2xl lg:rounded-tl-2xl  h-full lg:mr-2 justify-between items-center px-2 py-4  text-gray-300 font-semibold">
        <div className="flex flex-col items-center ">
          <Link to="/" className="rounded-2xl  hover:bg-gray-100/40  px-4 py-4">
            <MessageSquare className="size-4 lg:size-5" />
          </Link>
        </div>

        <div className="flex flex-row bg-black lg:hidden items-center gap-x-8 gap-y-8 rounded-full text-gray-300 font-semibold bg-gray-500/20 px-4 py-4">
          <button
            onClick={toggleSidebar}
            className="rounded-full bg-gray-100/25 hover:bg-gray-100/40 p-2"
            aria-label="Abrir sidebar de contactos"
          >
            <MessageCircle className="size-4 lg:size-5" />
          </button>
          <button
            onClick={toggleProfile}
            className="rounded-full bg-gray-100/25 hover:bg-gray-100/40 p-2 block"
            aria-label="Abrir sidebar de detalles"
          >
            <User className="size-4 lg:size-5" />
          </button>
        </div>

        {authUser && (
          <button
            onClick={logout}
            className="rounded-2xl  hover:bg-gray-100/40 px-4 py-4"
            aria-label="Logout"
          >
            <LogOut className="size-4 lg:size-5" />
          </button>
        )}
      </div>

      <div
        className={`fixed top-0 left-0 w-full h-full z-50 rounded-2xl transition-all duration-300 ${
          isProfileOpen ? "block" : "hidden"
        } lg:hidden`}
      >
        <button
          onClick={closeProfile}
          className="absolute top-6 right-6 rounded-full m-1 hover:bg-gray-200 text-gray-800 bg-gray-100 p-2 font-semibold text-sm"
          aria-label="Cerrar sidebar de detalles"
        >
          <X className="size-4 lg:size-5" />
        </button>

        <InfoMobileSidebar />
      </div>

      <div
        className={`fixed top-0 left-0 w-full h-full z-50 rounded-2xl transition-all duration-300 ${
          isSidebarOpen ? "block" : "hidden"
        } lg:hidden`}
      >
        <button
          onClick={closeSidebar}
          className="absolute top-6 right-6 rounded-full m-1 hover:bg-gray-200 text-gray-800 bg-gray-100 p-2 font-semibold text-sm"
          aria-label="Cerrar sidebar de contactos"
        >
          <X className="size-4 lg:size-5" />
        </button>

        <MobileSidebar closeSidebar={closeSidebar} />
      </div>
    </div>
  );
};

export default Navbar;
