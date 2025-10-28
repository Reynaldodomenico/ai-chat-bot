import { useState, useEffect } from "react";

export function usePuterAI() {
  const [aiReady, setAiReady] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.puter && window.puter.ai) {
        setAiReady(true);
        clearInterval(interval);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  function parseAIContent(content) {
    if (typeof content === "string") return content;
    if (Array.isArray(content)) return content.map(c => c.text || "").join("\n");
    if (content?.text) return content.text;
    return "No response from AI.";
  }

  const sendMessage = async (messageContent, model, onProgress) => {
    if (!aiReady) return "AI not ready";
    try {
      const response = await window.puter.ai.chat(messageContent, { model, onProgress });
      return parseAIContent(response.message.content);
    } catch (err) {
      console.error(err);
      return "Error: Unable to get response from AI.";
    }
  };

  return { aiReady, sendMessage };
}
