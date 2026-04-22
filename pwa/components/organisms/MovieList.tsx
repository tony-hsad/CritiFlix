import { useEffect, useState } from "react";
import Div from "../atoms/Div";
import MovieCard from "../molecules/MovieCard";
import { getContents } from "../../services/api/contentsApi";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getContents()
      .then((items) => {
        setMovies(items);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center text-gray-400 py-12">Chargement...</p>;
  }

  if (error) {
    return (
      <Div className="text-center py-12">
        <p className="text-red-500">Erreur : {error}</p>
      </Div>
    );
  }

  if (movies.length === 0) {
    return <p className="text-center text-gray-400 py-12">Aucun contenu disponible.</p>;
  }

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold text-white">Tous les contenus</h2>

      <Div classname="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Div>
    </section>
  );
}

export default MovieList;
