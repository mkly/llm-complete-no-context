import { createContext, useContext } from "react";

const TextareaContext = createContext<
  HTMLTextAreaElement | null
>(
  null,
);

interface TextareaProviderProps {
  textareaEl: HTMLTextAreaElement;
  children: React.ReactNode;
}

export function TextareaProvider({
  textareaEl,
  children,
}: TextareaProviderProps) {
  return (
    <TextareaContext.Provider value={textareaEl}>
      {children}
    </TextareaContext.Provider>
  );
}

export function useTextarea() {
  return useContext(TextareaContext);
}
