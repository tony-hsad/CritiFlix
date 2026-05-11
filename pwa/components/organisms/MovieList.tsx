import React, { useEffect, useState } from "react";
import MovieCard from "../molecules/MovieCard";
import Pagination from "../molecules/Pagination";
import { getContents } from "../../services/api/contentsApi";
import { LoaderCircle } from "lucide-react";
import { useSearch } from "../../contexts/providers/SearchContextProvider";
import type { PaginationType } from "@/types/Pagination";

function MovieList() {
  const itemsPerPage = 15;
  const { search } = useSearch();
  const [contents, setContents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const filteredContents = contents.filter((content) =>
    content.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    getContents(new URLSearchParams(`page=${currentPage}&limit=${itemsPerPage}`))
      .then((items) => {
        setContents(items["member"]);
        setTotalPages(Math.ceil(items.totalItems / itemsPerPage));
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage]);

  if (loading) {
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

  if (!contents.length) {
    return <p className="text-center text-gray-400 py-12">Aucun contenu disponible.</p>;
  }

  const pagination: PaginationType = {
    first: 1,
    previous: currentPage > 1 ? currentPage - 1 : undefined,
    current: currentPage,
    next: currentPage < totalPages ? currentPage + 1 : undefined,
    last: totalPages,
  };
  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold text-white">Tous les contenus</h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {filteredContents.map((content) => (
          <MovieCard key={content.id} content={content} />
        ))}
      </div>

      <Pagination pagination={pagination} onChangePage={setCurrentPage} />
    </section>
  );
}

export default MovieList;
