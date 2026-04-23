import Div from "../atoms/Div";
import Logo from "../atoms/Logo";
import NavActions from "../molecules/NavActions";
import SearchBar from "../molecules/SearchBar";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur border-b border-gray-800">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Div classname="flex-shrink-0">
          <Logo classname="text-2xl font-bold text-red-600 tracking-tight" content="CritiFlix" />
        </Div>

        <Div classname="flex flex-1 justify-center">
          <SearchBar />
        </Div>

        <Div classname="flex-shrink-0">
          <NavActions />
        </Div>
      </nav>
    </header>
  );
}

export default Navbar;
