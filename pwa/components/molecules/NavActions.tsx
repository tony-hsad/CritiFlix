import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/providers/AuthContextProvider";
import Button from "../atoms/Button";
import { ROUTES } from "../../routes/routes";

function NavActions() {
  const { user, logoutUser, loading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logoutUser();
    router.push(ROUTES.HOME);
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-400">...</span>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-white pr-2">
          {user.firstname} {user.lastname}
        </span>
        <Button variant="secondary" onClick={handleLogout} icon={{ name: "logout" }}>
          Se déconnecter
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="primary" onClick={() => router.push(ROUTES.LOGIN)} icon={{name: "login"}}>
        Se connecter
      </Button>
      <Button variant="primary" onClick={() => router.push(ROUTES.REGISTER)} icon={{name: "login"}}>
        S&apos;inscrire
      </Button>
    </div>
  );
}

export default NavActions;
