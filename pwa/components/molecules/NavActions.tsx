import { useRouter } from "next/router";
import { useAuth } from "../../contexts/providers/AuthContextProvider";
import { LogIn, LogOut } from "lucide-react";
import Div from "../atoms/Div";
import Button from "../atoms/Button";
import { ROUTES } from "../../routes/routes";

function NavActions() {
  const { user, isAuthenticated, logoutUser, loading } = useAuth();
  const router = useRouter();
  const handleLogout = () => {
    logoutUser();
    router.push(ROUTES.HOME);
  };

  if (loading) {
    return (
      <Div classname="flex items-center gap-2">
        <span className="text-sm text-gray-400">...</span>
      </Div>
    );
  }

  if (isAuthenticated) {
    return (
      <Div classname="flex items-center gap-2">
        <span className="text-sm text-white pr-2">
          {user?.firstname} {user?.lastname}
        </span>
        <Button variant="secondary" onClick={handleLogout} icon={<LogOut size={16} />}>
          Se déconnecter
        </Button>
      </Div>
    );
  }

  return (
    <Div classname="flex items-center gap-2">
      <Button variant="primary" onClick={() => router.push(ROUTES.LOGIN)} icon={<LogIn size={16} />}>
        Se connecter
      </Button>
      <Button variant="primary" onClick={() => router.push(ROUTES.REGISTER)} icon={<LogIn size={16} />}>
        S'inscrire
      </Button>
    </Div>
  );
}

export default NavActions;
