import type SuggestionType from "@/types/Suggestion";

interface SuggestionProps {
  index: number;
  suggestion: SuggestionType;
  onClick: () => void;
}

export default function Suggestion(
  { index, suggestion, onClick }: SuggestionProps,
) {
  return (
    <li
      className="cursor-pointer"
      onClick={onClick}
    >
      {`${index}: ${suggestion}`}
    </li>
  );
}
