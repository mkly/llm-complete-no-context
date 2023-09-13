import { useSuggestions } from "@/context/Suggestions";
import Suggestion from "@/components/Suggestion";

export default function Suggestions() {
  const [suggestions] = useSuggestions();

  return (
    <ul>
      {suggestions.map((suggestion, idx) => (
        <Suggestion
          key={idx}
          index={idx + 1}
          suggestion={suggestion}
        />
      ))}
    </ul>
  );
}
