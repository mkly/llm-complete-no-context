import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

const SuggestionsContext = createContext<
  [string[], Dispatch<SetStateAction<string[]>>] | null
>(null);

interface SuggestionsProviderProps {
  suggestions?: string[];
  children: ReactNode;
}

export function SuggestionsProvider({
  suggestions = [],
  children,
}: SuggestionsProviderProps) {
  const state = useState<string[]>(suggestions);

  return (
    <SuggestionsContext.Provider value={state}>
      {children}
    </SuggestionsContext.Provider>
  );
}

export function useSuggestions(): [
  string[],
  Dispatch<SetStateAction<string[]>>,
] {
  const state = useContext(SuggestionsContext);

  if (state === null) {
    return [[], () => {}];
  }

  return state;
}
