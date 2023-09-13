import { ReactNode } from "react";
import { useSuggestions } from "@/context/Suggestions";
import Suggestion from "@/components/Suggestion";

interface SuggestionsProps {
  children: ReactNode;
}

export default function Suggestions({ children }: SuggestionsProps) {
  const [suggestions] = useSuggestions();

  return (
    <ul>
      {children}
    </ul>
  );
}
