import { createContext, ReactNode, useContext } from "react";

const PageContentContext = createContext<string>("");

interface PageContentProviderProps {
  pageContent: string;
  children: ReactNode;
}

export function PageContentProvider({
  pageContent,
  children,
}: PageContentProviderProps) {
  return (
    <PageContentContext.Provider value={pageContent}>
      {children}
    </PageContentContext.Provider>
  );
}

export function usePageContent() {
  return useContext(PageContentContext);
}
