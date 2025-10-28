import { useEffect, useRef, useState } from "react";
import { usePuterAI } from "./hooks/usePuterAI";
import Header from "./components/Header";
import ChatWindow from "./components/ChatWindow";
import InputBox from "./components/InputBox";

function App() {
  const { aiReady, sendMessage: sendAIMessage } = usePuterAI();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [model, setModel] = useState("gpt-5-mini");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addMessages = (msg, isUser) => {
    setMessages((prev) => [...prev, { content: msg, isUser, id: Date.now() + Math.random() }]);
  };

  const handleSend = async () => {
    const messageContent = input.trim();
    if (!messageContent) return;
    addMessages(messageContent, true);
    setInput("");
    setLoading(true);

    const reply = await sendAIMessage(messageContent, model);
    addMessages(reply, false);
    setLoading(false);
    scrollToBottom();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header aiReady={aiReady} model={model} setModel={setModel} darkMode={darkMode} setDarkMode={setDarkMode} />
      <ChatWindow messages={messages} loading={loading} messagesEndRef={messagesEndRef} />
      <InputBox
        input={input} setInput={setInput} handleKeyPress={handleKeyPress} sendMessage={handleSend}
        messagesEndRef={messagesEndRef} aiReady={aiReady} loading={loading}
      />
    </div>
  );
}

export default App;
