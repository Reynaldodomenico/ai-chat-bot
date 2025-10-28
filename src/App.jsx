import { useEffect, useRef, useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [aiReady, setAiReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const checkAiReady = setInterval(() => {
      if (window.puter && window.puter.ai) {
        setAiReady(true);
        clearInterval(checkAiReady);
      }
    }, 300);
    return () => clearInterval(checkAiReady);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessages = (msg, isUser) => {
    setMessages((prev) => [
      ...prev,
      { content: msg, isUser, id: Date.now() + Math.random() },
    ]);
  };

  const sendMessage = async () => {
    const messageContent = input.trim();
    if (!messageContent) return;
    if (!aiReady) {
      addMessages("AI is not ready yet. Please wait.", false);
      return;
    }

    addMessages(messageContent, true);
    setInput("");
    setLoading(true);

    try {
      const response = await window.puter.ai.chat(messageContent, {
        onProgress: (partialResponse) => {
          console.log("Partial:", partialResponse);
        },
      });

      console.log("Full response:", response);
      const reply =
        typeof response === "string"
          ? response
          : response.message?.content || "No response from AI.";

      addMessages(reply, false);
    } catch (error) {
      console.error("Error communicating with AI:", error);
      addMessages("Error: Unable to get response from AI.", false);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 text-center shadow-sm">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          💬 AI Chat Bot
        </h1>
        <p
          className={`text-sm ${
            aiReady ? "text-green-500" : "text-yellow-500"
          }`}
        >
          {aiReady ? "AI is ready!" : "Loading AI..."}
        </p>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            Start a conversation with the AI 🤖
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.isUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-sm ${
                msg.isUser
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-200 dark:bg-gray-700 dark:text-gray-100 rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-2xl rounded-bl-none shadow-sm animate-pulse">
              AI is typing...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 flex items-center gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={
            aiReady ? "Type your message..." : "AI is not ready yet."
          }
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
    </div>
  );
}

export default App;
