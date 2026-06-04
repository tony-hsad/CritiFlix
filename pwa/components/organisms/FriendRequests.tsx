import React, { useState, useEffect } from "react";
import H1 from "../atoms/H1";
import Icon from "../atoms/Icon";
import { useAuth } from "../../contexts/providers/AuthContextProvider";
import UserCard from "../molecules/UserCard";
import { getSentFriendRequests, getReceivedFriendRequests } from "../../services/api/friendshipsApi";
import {User} from "@/types/UsersApi";

function FriendRequests() {
  const [usersRequested, setUsersRequested] = useState<ReadonlyArray<User>>([]);
  const [usersReceived, setUsersReceived] = useState<ReadonlyArray<User>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user: authenticatedUser } = useAuth();

  useEffect(() => {
    getSentFriendRequests(authenticatedUser?.id ?? '')
      .then((data) => {
        setIsLoading(true);
        setUsersRequested(data);
    })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });

    getReceivedFriendRequests(authenticatedUser?.id ?? '')
      .then((data) => {
        setIsLoading(true);
        setUsersReceived(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [authenticatedUser]);


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


  return (
    <div className="flex flex-row md:flex-row gap-8 justify-around">
      <div className="flex flex-col gap-4">
        <H1 className="text-3xl font-bold mb-4" content={`Demandes envoyées`} />

        {!usersRequested.length ? (
          <p className="text-center text-gray-400 py-12">Vous n&apos;avez envoyé aucune demande d&apos;amis</p>
        ) : (
          usersRequested.map((user) => (
            <UserCard key={user.id} {...user} />
          ))
        )}
      </div>

      <div className="flex flex-col gap-4">
        <H1 className="text-3xl font-bold mb-4" content={`Demandes reçues`} />

        {!usersReceived.length ? (
          <p className="text-center text-gray-400 py-12">Vous n&apos;avez reçue aucune demande d&apos;amis</p>
        ) : (
          usersReceived.map((user) => (
            <UserCard key={user.id} {...user} />
          ))
        )}
      </div>
    </div>
  );
}

export default FriendRequests;
