import React, { useState } from "react";
import Icon from "../atoms/Icon";
import UserCard from "../molecules/UserCard";
import Pagination from "../molecules/Pagination";
import usePaginatedUsers from "../../hooks/usePaginatedUsers";
import { getUsers } from "../../services/api/usersApi";
import { useSearch } from "../../contexts/providers/SearchContextProvider";

function UsersList() {
  const { search } = useSearch();
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, error, usersData, pagination, changePromise } =
    usePaginatedUsers(getUsers(new URLSearchParams(`page=${currentPage}`)));
  const filteredUsers = usersData.filter((user) =>
    user.lastname.toLowerCase().includes(search.toLowerCase()) ||
    user.firstname.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <p className="flex items-center justify-center gap-2 text-gray-400 py-12">
        <Icon name="loading" className="animate-spin" />
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

  if (!usersData.length) {
    return <p className="text-center text-gray-400 py-12">Aucun utilisateurs d'affichés.</p>;
  }

  function updatePageNumber(pageNumber: number) {
    setCurrentPage(pageNumber);
    changePromise(getUsers(new URLSearchParams(`page=${pageNumber}`)));
  }


  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold text-white">Tous les utilisateurs</h2>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {pagination && <Pagination pagination={pagination} onChangePage={updatePageNumber} />}
    </section>
  );
}

export default UsersList;
