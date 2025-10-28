export default function Message({ msg }) {
  return (
    <div className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-sm ${
        msg.isUser
          ? "bg-blue-600 text-white rounded-br-none"
          : "bg-gray-200 dark:bg-gray-700 dark:text-gray-100 rounded-bl-none"
      }`}>
        {msg.content}
      </div>
    </div>
  );
}
