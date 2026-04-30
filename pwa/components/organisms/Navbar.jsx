import Logo from "../atoms/Logo";
import Link from "../atoms/Link";
import NavActions from "../molecules/NavActions";
import SearchBar from "../molecules/SearchBar";
import { ROUTES } from "../../routes/routes";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur border-b border-gray-800">
      <nav className="relative flex items-center gap-6 px-10 py-4">
        <div className="flex-shrink-0">
          <Link classname="text-2xl font-bold text-red-600 tracking-tight" content="CritiFlix" to={`https://localhost${ROUTES.HOME}`} target="_self">
            <Logo content="" />
          </Link>
        </div>

        <div className="flex flex-1 justify-center">
          <SearchBar />
        </div>

        <div className="ml-auto flex-shrink-0">
          <NavActions />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
