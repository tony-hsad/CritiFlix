import React from "react";
import { useSearch } from "../../contexts/providers/SearchContextProvider";
import Input from "../atoms/Input";
import { Search } from "lucide-react";

function SearchBar() {
  const { search, setSearch } = useSearch();
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="w-full max-w-xl relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

      <Input
        value={search}
        onChange={handleChange}
        classname="w-full pl-11 px-4 py-2 rounded-md bg-gray-800 text-gray-100 placeholder-gray-400 border border-gray-700 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
        placeholder="Rechercher un film, une série, un documentaire..."
      />
    </div>
  );
}

export default SearchBar;
