import React, { useState, useContext } from "react";
import SearchContext from "../SearchContext";

/**
 * Provider that manages the user's queries in the Search bar
 * @param {object} props component's properties
 * @param {React.ReactNode} [props.children] Children of the SearchContext
 * @returns {React.ReactNode} SearchContextProvider
 */
function SearchContextProvider({ children }) {
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
