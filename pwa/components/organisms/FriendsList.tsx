import React, { useState } from "react";
import Icon from "../atoms/Icon";
import UserCard from "../molecules/UserCard";
import Pagination from "../molecules/Pagination";
import { getFriends } from "../../services/api/friendshipsApi";
import { useSearch } from "../../contexts/providers/SearchContextProvider";
import { useAuth } from "../../contexts/providers/AuthContextProvider";
import usePaginated from "../../hooks/usePaginatedContents";

function FriendsList() {
  const { user: authenticatedUser } = useAuth();
  const { search } = useSearch();
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, error, data, pagination, changePromise } =
    usePaginated(getFriends(authenticatedUser?.id ?? '', new URLSearchParams(`page=${currentPage}`)));
  const filteredUsers = data.filter((user) =>
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

  if (!data.length) {
    return <p className="text-center text-gray-400 py-12">Vous n&apos;avez pas encore d&apos;amis</p>;
  }

  function updatePageNumber(pageNumber: number) {
    setCurrentPage(pageNumber);
    changePromise(getFriends(authenticatedUser?.id ?? '', new URLSearchParams(`page=${pageNumber}`)));
  }


  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold text-white">Vos amis</h2>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} {...user} />
        ))}
      </div>

      {pagination && <Pagination pagination={pagination} onChangePage={updatePageNumber} />}
    </section>
  );
}

export default FriendsList;
