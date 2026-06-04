import React, { useEffect, useState } from "react";
import Icon from "../../components/atoms/Icon";
import HomeTemplate from "../../components/templates/HomeTemplate";
import UserDetail from "../../components/organisms/UserDetail";
import { getUserById } from "../../services/api/usersApi";
import { useRouter } from "next/router";
import { ROUTES } from "../../routes/routes";
import {User} from "@/types/UsersApi";

export default function UserPage() {
  const { push, query: { id } } = useRouter();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getUserById(id.toString())
      .then((data) => {
        if (!data?.id) {
          push(ROUTES.USERS);
          return;
        }
        setUser(data);
      })
      .catch(() => {
        push(ROUTES.USERS);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, push]);

  if (loading) {
    return (
      <HomeTemplate>
        <p className="flex items-center justify-center gap-2 text-gray-400 py-12">
          <Icon name="loading" className="animate-spin" />
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
