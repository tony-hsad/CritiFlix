import React, { useEffect, useState } from "react";
import Div from "../atoms/Div";
import MovieCard from "../molecules/MovieCard";
import { getContents } from "../../services/api/contentsApi";
import { LoaderCircle } from "lucide-react";

/**
 * A Content list component that displays all contents
 *
 * @returns {React.ReactNode} The list of Contents
 */
function MovieList() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getContents()
      .then((items) => {
        setContents(items);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
      <Div classname="text-center py-12">
        <p className="text-red-500">Erreur : {error}</p>
      </Div>
    );
  }

  if (!contents.length) {
    return <p className="text-center text-gray-400 py-12">Aucun contenu disponible.</p>;
  }

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold text-white">Tous les contenus</h2>

      <Div classname="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {contents.map((content) => (
          <MovieCard key={content.id} content={content} />
        ))}
      </Div>
    </section>
  );
}

export default MovieList;
