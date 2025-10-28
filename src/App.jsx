import { useEffect, useRef, useState } from 'react';
import './App.css'

function App() {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
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
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessages = (msg, isUser) => {
    setMessages((prevMessages) => [...prevMessages, { content: msg, isUser, id: Date.now() + Math.random() }]);
  }

  const sendMessage = async () => {
    const messageContent = input.trim();
    if (!messageContent) return;
    if (!aiReady) {
      addMessages("AI is not ready yet. Please wait.", false);
      return;
    }

    addMessages(messageContent, true);
    setInput('');
    setLoading(true);

    try {
    const response = await window.puter.ai.chat(messageContent, {
      onProgress: (partialResponse) => {    
        console.log("Partial:", partialResponse);
        addMessages(partialResponse, false);
      }     
    });

    console.log("Full response:", response);
      const reply =
        typeof response === "string"
          ? response
          : response.message.content || "No response from AI.";

      addMessages(reply, false);

    } catch (error) {
      console.error("Error communicating with AI:", error);
      addMessages("Error: Unable to get response from AI.", false);
    } finally {
      setInput('');
      setLoading(false);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div>
      <h1>Chat Bot</h1>
      <div>
        {aiReady ? "AI is ready!" : "Loading AI..."}
        <div>
          {messages.length === 0 && (
            <div>
              Start a conversation with the AI!
            </div>
          )}
          {messages.map((msg) => (
            <div key={msg.id} className={msg.isUser ? 'user-message' : 'ai-message'}>
              {msg.content}
            </div>
          ))}

          {loading && (
            <div className="ai-message">
              AI is typing...
            </div>
          )}

          <div ref={messagesEndRef} />

          <div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type= "text"
              onKeyDown={handleKeyPress}
              placeholder={ aiReady ? "Type your message..." : "AI is not ready yet." }
              disabled={!aiReady || loading}
            />
            <button onClick={sendMessage} disabled={!aiReady || loading}>Send</button>
          </div>
        </div>
      </div>
    </div>
    )
}

export default App
