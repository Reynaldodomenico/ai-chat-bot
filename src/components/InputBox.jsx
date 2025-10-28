export default function InputBox({ input, setInput, handleKeyPress, sendMessage, messagesEndRef, aiReady, loading }) {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 flex items-center gap-2">
      <textarea
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          e.target.style.height = "auto";
          e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }}
        onKeyDown={handleKeyPress}
        placeholder={aiReady ? "Type your message..." : "AI is not ready yet."}
        disabled={!aiReady || loading}
        className="flex-1 resize-none rounded-xl border border-gray-300 dark:border-gray-600 p-3 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        rows={1}
      />
      <button
        onClick={sendMessage}
        disabled={!aiReady || loading}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-xl font-medium transition-colors"
      >
        Send
      </button>
    </footer>
  );
}
