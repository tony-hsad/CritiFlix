import React, { useEffect, useState } from "react";
import { ROUTES } from "../../routes/routes";
import HomeTemplate from "../../components/templates/HomeTemplate";
import { getUserById } from "../../services/api/usersApi";
import { useRouter } from "next/router";
import { LoaderCircle } from "lucide-react";
import UserDetail from "../../components/organisms/UserDetail";

export default function UserPage() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getUserById(id)
      .then((data) => {
        if (!data?.id) {
          router.push(ROUTES.USERS);
          return;
        }
        setUser(data);
      })
      .catch(() => {
        router.push(ROUTES.USERS);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <HomeTemplate>
        <p className="flex items-center justify-center gap-2 text-gray-400 py-12">
          <LoaderCircle size={16} className="animate-spin" />
          Chargement...
        </p>
      </HomeTemplate>
    );
  }

  return (
    <HomeTemplate>
      {user && <UserDetail user={user} />}
    </HomeTemplate>
  );
}
