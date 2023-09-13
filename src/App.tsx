import "./index.css";
import { useEffect, useState } from "react";
import Suggestions from "@/components/Suggestions";
import Suggestion from "@/components/Suggestion";
import SuggestionType from "@/types/Suggestion";
import GetSuggestionsButton from "@/components/GetSuggestionsButton";
import postOpenAIInferencePrompt from "@/services/postOpenAIInferencePrompt";

interface AppProps {
  uuid: string;
  openAIKey: string;
  textareaEl: HTMLTextAreaElement;
  pageContent: string;
}

export default function App({
  openAIKey,
  textareaEl,
  pageContent,
}: AppProps) {
  const [visible, setVisibility] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<SuggestionType[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  useEffect(() => {
    if (textareaEl === null) {
      return;
    }
    textareaEl.addEventListener("focus", () => {
      setVisibility(true);
    });
  }, []);

  const handleGetSuggestions = async () => {
    if (textareaEl === null) {
      return;
    }

    const content = textareaEl.value;

    if (openAIKey === undefined) {
      return;
    }

    const chatcompletions = await postOpenAIInferencePrompt({
      pageContent: pageContent || "",
      content,
      openAIKey,
    });

    setSuggestions(chatcompletions);
    setShowSuggestions(true);
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setShowSuggestions(false);
    if (textareaEl === null) {
      return;
    }
    textareaEl.focus();
    textareaEl.value += suggestion;
  };

  if (!visible || !openAIKey) {
    return null;
  }

  return (
    <div>
      <GetSuggestionsButton onClick={handleGetSuggestions} />
      {showSuggestions
        ? (
          <Suggestions>
            {suggestions.map((suggestion, idx) => (
              <Suggestion
                key={idx}
                index={idx + 1}
                suggestion={suggestion}
                onClick={() => handleSelectSuggestion(suggestion)}
              />
            ))}
          </Suggestions>
        )
        : null}
    </div>
  );
}
