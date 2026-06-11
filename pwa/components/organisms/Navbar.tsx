import Logo from "../atoms/Logo";
import Link from "../atoms/Link";
import NavActions from "../molecules/NavActions";
import SearchBar from "../molecules/SearchBar";
import { ROUTES } from "../../routes/routes";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur border-b border-gray-800">
      <nav className="relative flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6 px-6 py-4 lg:px-10">

        <div className="flex-shrink-0 w-full lg:w-auto text-center lg:text-left">
          <Link className="text-2xl font-bold text-red-600 tracking-tight" content="CritiFlix" to={`https://localhost${ROUTES.HOME}`} target="_self" />
        </div>

        <div className="flex flex-1 w-full lg:absolute lg:inset-x-0 lg:justify-center lg:mx-auto lg:pointer-events-none">
          <div className="w-full max-w-xl lg:pointer-events-auto">
            <SearchBar />
          </div>
        </div>

        <div className="flex flex-row flex-wrap items-center justify-center gap-6 w-full lg:w-auto lg:ml-auto">
          <ul className="flex items-center space-x-6 text-sm">
            <li>
              <Link className="text-gray-300 hover:text-white transition-colors" to={`https://localhost${ROUTES.CREATE}`} content="Proposer un film" target="_self" />
            </li>

            <li>
              <Link className="text-gray-300 hover:text-white transition-colors" to={`https://localhost${ROUTES.USERS}`} content="Voir les utilisateurs" target="_self" />
            </li>
          </ul>

          <div className="flex-shrink-0">
            <NavActions />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
