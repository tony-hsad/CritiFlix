import Div from "../atoms/Div";
import Input from "../atoms/Input";

function SearchBar() {
  return (
    <Div classname="w-full max-w-xl">
      <Input
        classname="w-full px-4 py-2 rounded-md bg-gray-800 text-gray-100 placeholder-gray-400 border border-gray-700 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
        placeholder="Rechercher un film, une série, un documentaire..."
      />
    </Div>
  );
}

export default SearchBar;
