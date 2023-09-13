import "./index.css";
import { useEffect } from "react";
import { useVisibility } from "@/context/Visibility";
import { useTextarea } from "@/context/Textarea";
import { useOpenAIKey } from "@/context/OpenAIKey";
import { useShowSuggestions } from "@/context/ShowSuggestions";
import Suggestions from "@/components/Suggestions";
import GetSuggestionsButton from "@/components/GetSuggestionsButton";

export default function App() {
  const [visible, setVisibility] = useVisibility();
  const [openAIKey] = useOpenAIKey();
  const [showSuggestions] = useShowSuggestions();
  const textareaEl = useTextarea();

  useEffect(() => {
    if (textareaEl === null) {
      return;
    }
    textareaEl.addEventListener("focus", () => {
      setVisibility(true);
    });
  }, []);

  if (!visible || !openAIKey) {
    return null;
  }

  return (
    <div>
      <GetSuggestionsButton />
      {showSuggestions && <Suggestions />}
    </div>
  );
}
