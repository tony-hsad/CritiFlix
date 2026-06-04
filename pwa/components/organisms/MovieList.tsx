import React, { useState } from "react";
import Icon from "../atoms/Icon";
import MovieCard from "../molecules/MovieCard";
import Pagination from "../molecules/Pagination";
import { getContents } from "../../services/api/contentsApi";
import { useSearch } from "../../contexts/providers/SearchContextProvider";
import usePaginated from "../../hooks/usePaginatedContents";

function MovieList() {
  const { search } = useSearch();
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, error, data, pagination, changePromise } =
    usePaginated(getContents(new URLSearchParams(`page=${currentPage}`)));
  const filteredContents = data.filter((content) =>
    content.title.toLowerCase().includes(search.toLowerCase())
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
          <MovieCard key={content.id} {...content} />
        ))}
      </div>

      {pagination && <Pagination pagination={pagination} onChangePage={updatePageNumber} />}
    </section>
  );
}

export default MovieList;
