import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

const OpenAIKeyContext = createContext<
  [string | undefined, Dispatch<SetStateAction<string | undefined>>] | null
>(null);

interface OpenAIKeyProviderProps {
  openAIKey?: string;
  children: React.ReactNode;
}

export function OpenAIKeyProvider(
  { openAIKey, children }: OpenAIKeyProviderProps,
) {
  const state = useState<string | undefined>(openAIKey);

  return (
    <OpenAIKeyContext.Provider value={state}>
      {children}
    </OpenAIKeyContext.Provider>
  );
}

export function useOpenAIKey(): [
  string | undefined,
  Dispatch<SetStateAction<string | undefined>>,
] {
  const state = useContext(OpenAIKeyContext);

  if (state === null) {
    return ["", () => {}];
  }

  return state;
}
