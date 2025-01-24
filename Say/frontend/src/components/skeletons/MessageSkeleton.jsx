const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(7).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}
        >
          <div className="chat-image avatar">
            <div className="size-10 rounded-full">
              <div className="skeleton w-full h-full bg-gray-100" />
            </div>
          </div>

          

          <div className="chat-bubble bg-transparent p-0">
            <div className="skeleton h-16 w-[200px] bg-gray-100 rounded-md " />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
