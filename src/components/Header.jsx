export default function Header({ aiReady, model, setModel, darkMode, setDarkMode }) {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 text-center shadow-sm">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">💬 AI Chat Bot</h1>
      <p className={`text-sm ${aiReady ? "text-green-500" : "text-yellow-500"}`}>
        {aiReady ? "AI is ready!" : "Loading AI..."}
      </p>
      <div className="flex items-center gap-2 mt-2 justify-center">
        <label className="text-gray-700 dark:text-gray-300 text-sm">Model:</label>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="form-select appearance-none border border-gray-300 dark:border-gray-600 px-2 py-1 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
        >
          <option value="gpt-5-mini">GPT-5 Mini</option>
          <option value="gpt-5-nano">GPT-5 Nano</option>
          <option value="gpt-5">GPT-5</option>
          <option value="claude-sonnet-4">Claude Sonnet 4</option>
        </select>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-4 px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </header>
  );
}
