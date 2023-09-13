import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

const VisibilityContext = createContext<
  [boolean, Dispatch<SetStateAction<boolean>>] | null
>(null);

interface VisibilityProviderProps {
  initialVisible: boolean;
  children: React.ReactNode;
}

export function VisibilityProvider(
  { initialVisible, children }: VisibilityProviderProps,
) {
  const state = useState<boolean>(initialVisible);

  return (
    <VisibilityContext.Provider value={state}>
      {children}
    </VisibilityContext.Provider>
  );
}

export function useVisibility(): [boolean, Dispatch<SetStateAction<boolean>>] {
  const state = useContext(VisibilityContext);

  if (state === null) {
    return [false, () => {}];
  }

  return state;
}
