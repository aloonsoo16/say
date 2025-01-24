import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Send } from "lucide-react";

const MessageInput = () => {
  const [text, setText] = useState("");

  const { sendMessage, selectedUser } = useChatStore();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await sendMessage({
        text: text.trim(),
      });

      // Limpiar el texto del formulario
      setText("");
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  return (
    <div className="p-2 w-full rounded-2xl my-4 bg-indigo-50">
      <form onSubmit={handleSendMessage}>
        <div className="flex flex-1">
          <input
            type="text"
            className="flex-1 truncate disabled:cursor-not-allowed font-semibold text-sm bg-transparent text-black placeholder-gray-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-transparent"
            placeholder={`Escribe un mensaje a ${selectedUser.fullName}`}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="submit"
            disabled={!text.trim()}
            className={`${
              !text.trim() ? "cursor-not-allowed" : "hover:bg-indigo-100"
            } flex justify-center  items-center gap-2 px-4 rounded-full text-sm transition duration-300 ease-in-out
            `}
          >
            <Send  className="text-gray-500 hidden lg:block size-5" />
          </button>
        </div>
      </form>
    </div>
  );
};
export default MessageInput;
