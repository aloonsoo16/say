import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect, useRef, useState, useCallback } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { ArrowDown, Bell } from "lucide-react";
import { formattedMessageDate, formatDate } from "../lib/utils";

// Función para agrupar los mensajes por fechas
const groupMessagesByDate = (messages) => {
  return messages.reduce((groups, message) => {
    const dateKey = formatDate(message.createdAt);
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(message);
    return groups;
  }, {});
};

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();

  const colorOptions = ["#0D9488", "#0891B2", "#0284C7"];

  const messageEndRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const notificationSound = useRef(new Audio("/sounds/notification.mp3"));

  const currentMessages = messages[selectedUser?._id] || [];

  const scrollToBottom = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.scrollBehavior = "smooth";
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      scrollContainerRef.current.scrollTop = scrollHeight - clientHeight;

      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.style.scrollBehavior = "auto";
        }
      }, 500);
    }
    setIsAtBottom(true);
    setUnreadMessagesCount(0);
  }, []);

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
      setIsAtBottom(true);
      setUnreadMessagesCount(0);
      setShowScrollButton(false);

      setTimeout(() => {
        if (scrollContainerRef.current) {
          const { scrollHeight, clientHeight } = scrollContainerRef.current;
          scrollContainerRef.current.scrollTop = scrollHeight - clientHeight;
          setIsAtBottom(true);
        }
      }, 0);
    }
  }, [selectedUser, getMessages]);

  useEffect(() => {
    const onNewMessage = () => {
      if (isAtBottom) {
        scrollToBottom();
      } else {
        setUnreadMessagesCount((prev) => prev + 1);
        if (notificationSound.current) {
          notificationSound.current.pause();
          notificationSound.current.currentTime = 0;
          notificationSound.current.play().catch((error) => {
            console.error(
              "Error reproduciendo el sonido de notificación:",
              error
            );
          });
        }
      }
    };

    if (selectedUser) {
      subscribeToMessages(onNewMessage);
    }

    return () => {
      unsubscribeFromMessages();
    };
  }, [
    selectedUser,
    isAtBottom,
    scrollToBottom,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [currentMessages, isAtBottom, scrollToBottom]);

  const handleScroll = useCallback((e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const isBottom = Math.abs(scrollHeight - clientHeight - scrollTop) <= 5;

    setIsAtBottom(isBottom);
    setShowScrollButton(!isBottom);

    if (isBottom) {
      setUnreadMessagesCount(0);
    }
  }, []);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 bg-white flex flex-col overflow-hidden  lg:rounded-tl-none lg:rounded-bl-none lg:rounded-tr-2xl lg:rounded-br-2xl rounded-2xl ">
        <ChatHeader />
        <div className="flex-1 overflow-y-auto scrollbar-hide hover:scrollbar-default scrollbar-thin scrollbar-thumb-buttonColor scrollbar-track-transparent">
          <MessageSkeleton />
        </div>
        <MessageInput />
      </div>
    );
  }

  const groupedMessages = groupMessagesByDate(currentMessages);

  return (
    <div className="flex-1 px-2  lg:px-6 flex flex-col lg:rounded-tl-none  lg:rounded-bl-none lg:rounded-tr-2xl lg:rounded-br-2xl  bg-white">
      <ChatHeader />

      <div
        className="flex-1 overflow-y-auto px-4 py-6 scrollbar-hide hover:scrollbar-default scrollbar-thin scrollbar-thumb-buttonColor scrollbar-track-transparent"
        onScroll={handleScroll}
        ref={scrollContainerRef}
      >
        <div className="space-y-4">
          {currentMessages.length === 0 ? (
            <div className="flex h-[450px] lg:h-[600px]  flex-wrap justify-center items-center text-center font-semibold text-gray-800 text-sm">
              Aún no has chateado con {selectedUser?.fullName}. ¡Envíale un
              primer mensaje!
            </div>
          ) : (
            Object.keys(groupedMessages).map((dateKey) => (
              <div key={dateKey}>
                <div className="text-center">
                  <span className="px-4 py-2 rounded-full text-sm font-semibold text-gray-800">
                    {dateKey}
                  </span>
                </div>
                {groupedMessages[dateKey].map((message) => (
                  <div
                    key={message._id}
                    className={`chat ${
                      message.senderId === authUser._id
                        ? "chat-end"
                        : "chat-start"
                    }`}
                  >
                    <div className="chat-image">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor:
                            message.senderId === authUser._id
                              ? `${authUser.color}30`
                              : `${selectedUser.color}30`,
                        }}
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor:
                              message.senderId === authUser._id
                                ? authUser.color
                                : selectedUser.color,
                          }}
                        >
                          <span className="text-white font-semibold text-sm">
                            {message.senderId === authUser._id
                              ? authUser.fullName.charAt(0).toUpperCase()
                              : selectedUser.fullName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`rounded-2xl max-w-[75%] chat-bubble ${
                        message.senderId === authUser._id
                          ? "bg-indigo-400 text-white"
                          : "bg-indigo-50 text-gray-800"
                      }`}
                    >
                      <div className="flex flex-col space-y-2">
                        {message.senderId !== authUser._id && (
                          <p className="font-semibold text-xs text-gray-500">
                            {selectedUser.fullName}
                          </p>
                        )}
                        <p
                          className={`text-sm mt-1 font-semibold ${
                            message.senderId === authUser._id
                              ? "text-white"
                              : "text-gray-800"
                          }`}
                          style={{ wordBreak: "break-word" }}
                        >
                          {message.text}
                        </p>
                        <span
                          className={`text-xs font-semibold ${
                            message.senderId === authUser._id
                              ? "text-right text-white"
                              : "text-left text-gray-500"
                          }`}
                        >
                          {formattedMessageDate(message.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
        <div className="h-0" ref={messageEndRef} />
      </div>

      <div className="relative w-full">
        <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center space-x-2 pb-2">
          {unreadMessagesCount > 0 && !isAtBottom && (
            <button
              onClick={scrollToBottom}
              className="flex items-center justify-center gap-2 bg-gray-100 text-gray-800 p-2 rounded-full transition-all duration-300 hover:bg-gray-200"
            >
              <Bell className="size-4 lg:size-5" />
              <span className="font-semibold text-sm text-gray-800">
                {unreadMessagesCount}{" "}
                {unreadMessagesCount > 1 ? "mensajes nuevos" : "mensaje nuevo"}
              </span>
            </button>
          )}

          {showScrollButton && unreadMessagesCount === 0 && (
            <button
              onClick={scrollToBottom}
              className="bg-gray-100 text-gray-500 p-2 rounded-full transition-all duration-300 hover:bg-gray-200 animate-bounce"
            >
              <ArrowDown className="size-4 lg:size-5" />
            </button>
          )}
        </div>
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
