import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full overflow-y-auto  scrollbar-transparent hover:scrollbar-default scrollbar-thin scrollbar-thumb-buttonColor scrollbar-track-transparent  py-4  w-72 hidden lg:flex flex-col transition-all duration-200 bg-white rounded-tl-2xl rounded-bl-2xl">
      {/* Sección de Contactos */}
      <div className="px-4 flex justify-center items-center">
        <div className="w-full rounded-2xl space-y-4 p-6 bg-indigo-100">
          <div className="block">
            <h2 className="truncate text-gray-800 text-base font-semibold">
              Listado de usuarios
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <label className="cursor-pointer flex items-center gap-2 ">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="hidden"
              />
              <span
                className={`w-10 h-5 flex items-center rounded-full p-1 transition-all duration-300 text-gray-800 
              ${showOnlineOnly ? "bg-gray-100" : "bg-gray-100"} cursor-pointer`}
              >
                <span
                  className={`w-4 h-4  rounded-full transition-transform duration-300 
                ${
                  showOnlineOnly
                    ? "translate-x-4 bg-green-400"
                    : "translate-x-0 bg-gray-800"
                }`}
                />
              </span>
              <span className="text-sm font-semibold text-gray-800">
                Solo Online
              </span>
            </label>

            <span className="text-xs text-gray-500 font-semibold">
              ({onlineUsers.length - 1} online)
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 px-3 my-3 overflow-y-auto space-y-3 w-full scrollbar-transparent hover:scrollbar-default scrollbar-thin scrollbar-thumb-buttonColor scrollbar-track-transparent">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center rounded-2xl  
          ${
            selectedUser?._id === user._id
              ? "bg-indigo-50"
              : "hover:bg-indigo-50"
          }`}
          >
            <div className="relative mx-0">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${user.color}30` }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: user.color }}
                >
                  <span className="text-white font-bold text-sm">
                    {user.fullName.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 ring-2 ring-white
                  rounded-full"
                />
              )}
            </div>

            <div className="block px-4 text-left min-w-0">
              <div className="font-semibold truncate text-gray-800">
                <span className="font-semibold text-sm">{user.fullName}</span>
              </div>
              <div className="text-xs text-gray-500 font-semibold">
                {onlineUsers.includes(user._id) ? "En línea" : "Desconectado"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-gray-800 bg-gray-100 font-semibold  rounded-2xl 50 h-full flex flex-wrap justify-center items-center text-center text-sm">
            No hay usuarios online
          </div>
        )}
      </div>
      <div className="px-4 flex justify-center items-center">
        <div className="w-full rounded-2xl text-gray-800 font-semibold text-sm p-6 bg-gray-100">
          <p>Ten precaución con la información que compartes.</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
