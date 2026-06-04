import {createContext, Dispatch, SetStateAction} from "react";

const SearchContext = createContext<{ search: string; setSearch: Dispatch<SetStateAction<string>> }>({
  search: "",
  setSearch: (e) => {},
});

export default SearchContext;
