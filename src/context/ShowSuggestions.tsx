import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

const ShowSuggestionsContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>]
>([false, () => {}]);

interface ShowSuggestionsProviderProps {
  children: ReactNode;
}

export function ShowSuggestionsProvider({
  children,
}: ShowSuggestionsProviderProps) {
  const state = useState(false);

  return (
    <ShowSuggestionsContext.Provider
      value={state}
    >
      {children}
    </ShowSuggestionsContext.Provider>
  );
}

export function useShowSuggestions() {
  return useContext(ShowSuggestionsContext);
}
