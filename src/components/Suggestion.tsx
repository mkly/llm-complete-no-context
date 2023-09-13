import type SuggestionType from "@/types/Suggestion";
import { useTextarea } from "@/context/Textarea";
import { useShowSuggestions } from "@/context/ShowSuggestions";

interface SuggestionProps {
  index: number;
  suggestion: SuggestionType;
}

export default function Suggestion(
  { index, suggestion }: SuggestionProps,
) {
  const textareaEl = useTextarea();
  const [, setShowSuggestions] = useShowSuggestions();

  const handleSelectSuggestion = (suggestion: string) => {
    setShowSuggestions(false);
    if (textareaEl === null) {
      return;
    }
    textareaEl.focus();
    textareaEl.value += suggestion;
  };

  return (
    <li
      className="cursor-pointer"
      onClick={() => handleSelectSuggestion(suggestion)}
    >
      {`${index}: ${suggestion}`}
    </li>
  );
}
