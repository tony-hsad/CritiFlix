import { useEffect, useState } from "react";
import paginationFromCollectionView from "../services/transformers/paginationFromCollectionView";
import type { UsersCollection } from "@/types/UsersApi";
import type { APIPlatformListResponse } from "../services/api/client";

function usePaginatedUsers(promise: Promise<APIPlatformListResponse<UsersCollection>>) {
  const [currentPromise, setCurrentPromise] = useState(promise);
  const [usersData, setUsersData] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // setIsLoading(true);

    currentPromise.then((data: UsersCollection) => {
      console.log('one')
      setUsersData(data["member"]);
      setPagination(paginationFromCollectionView(data.view));
    })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        console.log('passed')
        setIsLoading(false);
      });
  }, [currentPromise]);

  function changePromise(newPromise: Promise<APIPlatformListResponse<UsersCollection>>) {
    setCurrentPromise(newPromise);
  }

  return {
    isLoading: isLoading,
    error: error,
    usersData: usersData,
    pagination: pagination,
    changePromise: changePromise,
  };
}

export default usePaginatedUsers;
