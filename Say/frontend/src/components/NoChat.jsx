import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center lg:p-16   lg:rounded-tr-2xl lg:rounded-br-2xl lg:rounded-tl-none lg:rounded-bl-none bg-white">
      <div className="max-w-md text-center space-y-2">
        <div className="flex justify-center gap-4 mb-4">
          <div
            className="w-12 h-12 lg:w-16 lg:h-16 rounded-full  flex items-center
             justify-center animate-bounce bg-gray-100 font-semibold"
          >
            <MessageSquare className="text-gray-800 size-6 lg:size-8"  />
          </div>
        </div>

        <h2 className="text-lg lg:text-2xl px-2 lg:px-0 text-gray-800 font-bold">Bienvenido!</h2>
        <p className="text-gray-500 px-2 lg:px-0 font-medium text-sm lg:text-base">
          Selecciona una conversación de tus contactos para comenzar a chatear
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
