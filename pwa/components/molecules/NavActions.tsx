import { useRouter } from "next/router";
import { useAuth } from "../../contexts/providers/AuthContextProvider";
import Div from "../atoms/Div";
import Button from "../atoms/Button";

function NavActions() {
  const { user, isAuthenticated, logoutUser, loading } = useAuth();
  const router = useRouter();
  const handleLogout = () => {
    logoutUser();
    router.push("/home");
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
        <Button variant="secondary" onClick={handleLogout}>
          Se déconnecter
        </Button>
      </Div>
    );
  }

  return (
    <Div classname="flex items-center gap-2">
      <Button variant="primary" onClick={() => router.push("/login")}>
        Se connecter
      </Button>
    </Div>
  );
}

export default NavActions;
