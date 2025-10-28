import Message from "./Message";

export default function ChatWindow({ messages, loading, messagesEndRef }) {
  return (
    <main className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 && (
        <div className="text-center text-gray-500 mt-10">Start a conversation with the AI 🤖</div>
      )}

      {messages.map((msg) => <Message key={msg.id} msg={msg} />)}

      {loading && (
        <div className="flex justify-start">
          <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-2xl rounded-bl-none shadow-sm flex gap-1 items-center">
            <span className="w-2 h-2 bg-gray-500 dark:bg-gray-300 rounded-full animate-bounce delay-0"></span>
            <span className="w-2 h-2 bg-gray-500 dark:bg-gray-300 rounded-full animate-bounce delay-150"></span>
            <span className="w-2 h-2 bg-gray-500 dark:bg-gray-300 rounded-full animate-bounce delay-300"></span>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </main>
  );
}
