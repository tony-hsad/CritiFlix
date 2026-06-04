import { useState, useEffect } from "react";
import paginationFromCollectionView from "../services/transformers/paginationFromCollectionView";
import type {Content} from "@/types/molecules";
import type {APIPlatformListResponse} from "../services/api/client";
import {PaginationType} from "@/types/Pagination";

function usePaginated<T>(promise: Promise<APIPlatformListResponse<T>>) {
  const [currentPromise, setCurrentPromise] = useState(promise);
  const [data, setData] = useState<ReadonlyArray<T>>([]);
  const [pagination, setPagination] = useState<PaginationType>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    currentPromise.then((data: APIPlatformListResponse<T>) => {
      setData(data.member);
      setPagination(paginationFromCollectionView(data.view));
    })
    .catch((err) => {
      setError(err.message);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, [currentPromise]);

  function changePromise(newPromise: Promise<APIPlatformListResponse<T>>) {
    setCurrentPromise(newPromise);
  }

  return {
    isLoading,
    error,
    data,
    pagination,
    changePromise,
  };
}

export default usePaginated;
