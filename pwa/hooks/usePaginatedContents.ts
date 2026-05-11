import { useState, useEffect } from "react";
import paginationFromCollectionView from "../services/transformers/paginationFromCollectionView";
import type { ContentsCollection } from "@/types/molecules";

function usePaginatedContents(promise: Promise<ContentsCollection>) {
  const [currentPromise, setCurrentPromise] = useState(promise);
  const [contentsData, setContentsData] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    currentPromise.then((data: ContentsCollection) => {
      setContentsData(data["member"]);
      setPagination(paginationFromCollectionView(data.view));
      setIsLoading(false);
    })
    .catch((err) => {
      setError(err.message);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, [currentPromise]);

  function changePromise(newPromise: Promise<ContentsCollection>) {
    setCurrentPromise(newPromise);
  }

  return {
    isLoading: isLoading,
    error: error,
    contentsData: contentsData,
    pagination: pagination,
    changePromise: changePromise,
  };
}

export default usePaginatedContents;
