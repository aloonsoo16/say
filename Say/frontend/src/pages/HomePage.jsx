import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChat";
import InfoSidebar from "../components/InfoSidebar";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="flex flex-col h-screen bg-indigo-100 overflow-hidden">
      {/* Navbar para pantallas pequeñas */}
      <div className="lg:hidden">
        <Navbar />
      </div>

      <div className="flex-1 flex flex-col lg:flex-row lg:p-6 overflow-hidden">
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden lg:p-2  lg:rounded-2xl h-full bg-black">
          {/* Navbar para pantallas grandes */}
          <div className="hidden lg:flex">
            <Navbar />
          </div>

          <Sidebar />

          <div className="flex-1 flex overflow-hidden  lg:p-0">
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>

          <InfoSidebar />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
