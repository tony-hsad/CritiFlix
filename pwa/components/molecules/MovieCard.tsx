import type { Content } from "@/types/molecules";
import Div from "../atoms/Div";
import Image from "../atoms/Image";

function MovieCard({ content }: Content) {
  const moviePoster = content.poster || "https://t3.ftcdn.net/jpg/06/64/80/00/360_F_664800080_DB9Ed3O11GxDt0gPXtsqajrNDV52V84M.jpg";
  const formattedDate = content.releaseDate ? new Date(content.releaseDate).toLocaleDateString("fr-FR") : null;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg bg-gray-900 shadow-lg transition-transform hover:scale-105 hover:shadow-2xl">
      <a href={`/contents/${content.id}`}>
        <Div classname="relative aspect-[2/3] w-full overflow-hidden bg-gray-800">

          <Image
            src={moviePoster}
            alt={content.title}
            classname="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />

          <Div classname="absolute left-2 right-2 top-2 flex items-start justify-between gap-2">
            {content.type && (
              <span className="rounded-full px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-white shadow-md">
                {content.type}
              </span>
            )}

            {content.minimalAge != null && (
              <span className="rounded border border-red-500 bg-black/70 px-1.5 py-0.5 text-xs font-bold text-red-400 backdrop-blur-sm">
                {content.minimalAge}+
              </span>
            )}
          </Div>

        </Div>
      </a>

      <Div classname="flex flex-1 flex-col p-3">
        <h3 className="mb-1 line-clamp-1 text-sm font-bold text-white">
          {content.title}
        </h3>

        <Div classname="mb-2 flex items-center gap-2 text-xs text-gray-400">
          {content.releaseDate && <span>{content.releaseDate}</span>}
        </Div>

        {formattedDate && (
          <p className="mt-auto text-[11px] text-gray-500">
            Publié : <span className="text-gray-300">{formattedDate}</span>
          </p>
        )}
      </Div>
    </article>
  );
}

export default MovieCard;
