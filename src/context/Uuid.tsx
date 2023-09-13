import { createContext, useContext } from "react";

const UuidContext = createContext<string | null>(null);

interface UuidProviderProps {
  uuid: string;
  children: React.ReactNode;
}

export function UuidProvider({ uuid, children }: UuidProviderProps) {
  return (
    <UuidContext.Provider value={uuid}>
      {children}
    </UuidContext.Provider>
  );
}

export function useUuid() {
  return useContext(UuidContext);
}
