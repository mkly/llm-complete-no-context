import { useEffect, useState } from "react";

export default function Popup() {
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    chrome.storage.sync.get(["openAIKey"], (result) => {
      if (result.openAIKey) {
        setValue(result.openAIKey);
      }
      setLoading(false);
    });
  }, []);

  const handleSumit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    chrome.storage.sync.set({
      "openAIKey": value,
    }, () => {
      setMessage("OpenAi API Key Updated");
      setTimeout(() => {
        setMessage(undefined);
      }, 3000);
    });
  };

  if (loading) {
    return (
      <div className="w-48 p-2">
        <div className="bg-gray-100 border border-gray-400 text-gray-700 px-2 py-1 rounded relative mb-1">
          <span className="block sm:inline">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-48 p-2">
      {message !== undefined && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-2 py-1 rounded relative mb-1">
          <span className="block sm:inline">{message}</span>
        </div>
      )}
      <form onSubmit={handleSumit} className="bg-white p-1">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="openaikey"
          >
            OpenAI API Key
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="openaikey"
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="sk-..."
          />
        </div>
        <div className="flex items-center justify-end">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
