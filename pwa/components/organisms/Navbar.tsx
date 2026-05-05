import Div from "../atoms/Div";
import Logo from "../atoms/Logo";
import Link from "../atoms/Link";
import NavActions from "../molecules/NavActions";
import SearchBar from "../molecules/SearchBar";
import { ROUTES } from "../../routes/routes";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur border-b border-gray-800">
      <nav className="relative flex items-center gap-6 px-10 py-4">
        <Div classname="flex-shrink-0">
          <Link classname="text-2xl font-bold text-red-600 tracking-tight" content="CritiFlix" to={`https://localhost${ROUTES.HOME}`} target="_self">
            <Logo content="" />
          </Link>
        </Div>

        <Div classname="flex flex-1 justify-center">
          <SearchBar />
        </Div>

        <Div classname="ml-auto flex-shrink-0">
          <NavActions />
        </Div>
      </nav>
    </header>
  );
}

export default Navbar;
