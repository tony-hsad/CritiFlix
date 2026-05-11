import React, { useState } from "react";
import MovieCard from "../molecules/MovieCard";
import Pagination from "../molecules/Pagination";
import { getContents } from "../../services/api/contentsApi";
import usePaginatedContents from "../../hooks/usePaginatedContents";
import { LoaderCircle } from "lucide-react";
import { useSearch } from "../../contexts/providers/SearchContextProvider";

function MovieList() {
  const { search } = useSearch();
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, error, contentsData, pagination, changePromise } =
    usePaginatedContents(getContents(new URLSearchParams(`page=${currentPage}`)));
  const filteredContents = contentsData.filter((content) =>
    content.title.toLowerCase().includes(search.toLowerCase())
  );

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

  if (!contentsData.length) {
    return <p className="text-center text-gray-400 py-12">Aucun contenu disponible.</p>;
  }

  function updatePageNumber(pageNumber: number) {
    setCurrentPage(pageNumber);
    changePromise(getContents(new URLSearchParams(`page=${pageNumber}`)));
  }

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold text-white">Tous les contenus</h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {filteredContents.map((content) => (
          <MovieCard key={content.id} content={content} />
        ))}
      </div>

      <Pagination pagination={pagination} onChangePage={updatePageNumber} />
    </section>
  );
}

export default MovieList;
