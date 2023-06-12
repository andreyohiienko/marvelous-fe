import { createContext, ReactElement, FC, useContext, useState } from "react";

type Default = [string, (value: string | ((val: string) => string)) => void];

const SearchContext = createContext<Default>(["", () => {}]);

type Props = {
  children: ReactElement | ReactElement[];
};

export const SearchProvider: FC<Props> = ({ children }) => {
  const value = useState("");
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export function useSearch() {
  const context = useContext<Default>(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
