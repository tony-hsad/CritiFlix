import React, { useState, useEffect } from "react";
import UserCard from "./UserCard";
import { getUsers } from "../../services/api/usersApi";
import { LoaderCircle } from "lucide-react";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <p className="flex items-center justify-center gap-2 text-gray-400 py-12">
        <LoaderCircle size={16} className="animate-spin" />
        Chargement...
      </p>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Erreur : {error}</p>
      </div>
    );
  }

  if (!users.length) {
    return <p className="text-center text-gray-400 py-12">Aucun utilisateurs d'affichés.</p>;
  }


  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold text-white">Tous les utilisateurs</h2>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </section>
  );
}

export default UsersList;
