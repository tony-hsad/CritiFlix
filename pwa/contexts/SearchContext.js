import { createContext } from "react";

/**
 * @type {import("react").Context<{
 *   search: string,
 *   setSearch: (value: string) => void,
 * }>}
 */

const SearchContext = createContext({
  search: "",
  setSearch: () => {},
});

export default SearchContext;
