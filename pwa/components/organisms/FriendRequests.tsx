import React, { useState, useEffect } from "react";
import H1 from "../atoms/H1";
import Icon from "../atoms/Icon";
import { useAuth } from "../../contexts/providers/AuthContextProvider";
import UserCard from "../molecules/UserCard";
import { getSentFriendRequests, getReceivedFriendRequests } from "../../services/api/friendshipsApi";


function FriendRequests() {
  const [usersRequested, setUsersRequested] = useState([]);
  const [usersReceived, setUsersReceived] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userAuthenticated } = useAuth();

  useEffect(() => {
    if (!userAuthenticated) {
      return;
    }

    getSentFriendRequests(userAuthenticated.id).then((data) => {
      setIsLoading(true);
      setUsersRequested(data);
    })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });

    getReceivedFriendRequests(userAuthenticated.id).then((data) => {
      setIsLoading(true);
      setUsersReceived(data);
    })
      .catch((err) => {
      setError(err.message);
    })
      .finally(() => {
        setIsLoading(false);
      });

  }, [userAuthenticated]);



  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Erreur : {error}</p>
      </div>
    );
  }


  return (
    <div className="flex flex-row md:flex-row gap-8">
      <div className="flex flex-col">
        <H1 classname="text-3xl font-bold mb-4" content={`Demandes envoyées`} />

        {usersRequested.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      <div className="flex flex-col">
        <H1 classname="text-3xl font-bold mb-4" content={`Demandes reçues`} />

        {usersReceived.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}

export default FriendRequests;
