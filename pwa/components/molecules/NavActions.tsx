import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/providers/AuthContextProvider";
import Button from "../atoms/Button";
import Link from "../atoms/Link";
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
        <a href={`${ROUTES.USERS}/${user.id}`} className="flex gap-2">
          <img
            width={40}
            height={40}
            src={user.avatar}
            alt={`Avatar de ${user.firstname} ${user.lastname}`}
          />
          <span className="flex m-auto text-sm text-white pr-2">
            {user.firstname} {user.lastname}
          </span>
        </a>

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
