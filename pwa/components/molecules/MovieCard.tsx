import Chip from "../atoms/Chip";
import Image from "../atoms/Image";
import Link from "../atoms/Link";
import {Content} from "@/types/molecules";
import {TMDB_IMG_URL} from "../../services/api/contentsApi";

function MovieCard(content: Content) {
  //const moviePoster = content.poster || "https://t3.ftcdn.net/jpg/06/64/80/00/360_F_664800080_DB9Ed3O11GxDt0gPXtsqajrNDV52V84M.jpg";
  const moviePoster = `${TMDB_IMG_URL}${content.poster}` || "https://t3.ftcdn.net/jpg/06/64/80/00/360_F_664800080_DB9Ed3O11GxDt0gPXtsqajrNDV52V84M.jpg";
  const formattedDate = content.releaseDate ? new Date(content.releaseDate).toLocaleDateString("fr-FR") : null;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg bg-gray-900 shadow-lg transition-transform hover:scale-105 hover:shadow-2xl">
      <Link to={`/contents/${content.id}`}>
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-800">

          <Image
            src={moviePoster}
            alt={content.title}
            className="transition-transform duration-300 group-hover:scale-110"
          />

          <div className="absolute left-2 right-2 top-2 flex items-start justify-between gap-2">
            {content.type && (
              <Chip className="bg-black uppercase tracking-wide text-orange-400 shadow-md">
                {content.type}
              </Chip>
            )}

            {content.minimalAge && (
              <Chip className="border-red-500 bg-black/70 text-red-400 backdrop-blur-sm">
                {content.minimalAge}+
              </Chip>
            )}
          </div>

        </div>
      </Link>

      <div className="flex flex-1 flex-col p-3">
        <h3 className="mb-1 line-clamp-1 text-sm font-bold text-white">
          {content.title}
        </h3>

        <div className="mb-2 flex items-center gap-2 text-xs text-gray-400">
          {content.description && <span className="line-clamp-1">{content.description}...</span>}
        </div>

        {formattedDate && (
          <p className="mt-auto text-[11px] text-gray-500">
            Publié : <span className="text-gray-300">{formattedDate}</span>
          </p>
        )}
      </div>
    </article>
  );
}

export default MovieCard;
