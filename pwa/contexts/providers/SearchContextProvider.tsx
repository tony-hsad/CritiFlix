import React, { useState, useContext } from "react";
import SearchContext from "../SearchContext";

function SearchContextProvider({ children }: React.PropsWithChildren) {
  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}

export default SearchContextProvider;
