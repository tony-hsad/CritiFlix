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
          <Link className="text-2xl font-bold text-red-600 tracking-tight" content="CritiFlix" to={ROUTES.HOME} target="_self" />
        </div>

        <div className="flex flex-1 justify-center">
          <SearchBar />
        </div>

        <div className="flex-shrink-0">
          <ul className="flex space-x-1">
            <li>
              <span><Link className="text-white" to={ROUTES.CREATE} content="Proposer un film" target="_self" /></span>
            </li>

            <li>
              <span><Link className="text-white" to={ROUTES.USERS} content="Voir les utilisateurs" target="_self" /></span>
            </li>
          </ul>
        </div>

        <div className="ml-auto flex-shrink-0">
          <NavActions />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
