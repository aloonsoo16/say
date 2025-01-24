import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="py-5 rounded-2xl bg-white mb-4">
      <div className="flex items-center justify-between px-2 lg;px-4">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${selectedUser.color}30` }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: selectedUser.color }}
            >
              <span className="text-white font-bold text-sm">
                {selectedUser.fullName.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <h2 className="font-semibold text-lg text-gray-800">
              {selectedUser.fullName}
            </h2>
            <p className="text-xs text-gray-500 font-semibold">
              {onlineUsers.includes(selectedUser._id)
                ? "En línea"
                : "Desconectado"}
            </p>
          </div>
        </div>

        <button
          className="rounded-full p-2 bg-gray-100 text-gray-500 hover:bg-gray-200"
          onClick={() => setSelectedUser(null)}
        >
          <X className="size-4 lg:size-5" />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
