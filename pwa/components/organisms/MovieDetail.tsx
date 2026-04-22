import type { Movie } from "@/types/molecules";
import Div from "../atoms/Div";
import H1 from "../atoms/H1";
import Image from "../atoms/Image";

function MovieDetail({ movie }: Movie) {
  const moviePoster = movie.poster || "https://t3.ftcdn.net/jpg/06/64/80/00/360_F_664800080_DB9Ed3O11GxDt0gPXtsqajrNDV52V84M.jpg";
  const formattedDate = movie.releaseDate ? new Date(movie.releaseDate).toLocaleDateString("fr-FR") : null;

  return (
    <Div classname="flex flex-col md:flex-row gap-8">
      <Div classname="w-full md:w-1/3">
        <Image
          classname="w-full rounded-lg"
          src={moviePoster}
          alt={movie.title}
        />
      </Div>

      <Div classname="flex-1">
        <H1 classname="text-3xl font-bold mb-4" content={movie.title} />
        {movie.type && (
          <p className="text-sm text-red-500 mb-2">{movie.type}</p>
        )}

        {formattedDate && (
          <p className="text-sm text-gray-400 mb-4">
            Publié le : {formattedDate}
          </p>
        )}

        {movie.description && (
          <p className="text-gray-200">{movie.description}</p>
        )}

        {movie.entrances != null && (
          <p className="mt-4 text-gray-400">
            {movie.entrances} entrées
          </p>
        )}
      </Div>
    </Div>
  );
}

export default MovieDetail;
