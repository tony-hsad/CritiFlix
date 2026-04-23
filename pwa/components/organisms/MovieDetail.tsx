import type { Content } from "@/types/molecules";
import Div from "../atoms/Div";
import H1 from "../atoms/H1";
import Image from "../atoms/Image";

function MovieDetail({ content }: Content) {
  const moviePoster = content.poster || "https://t3.ftcdn.net/jpg/06/64/80/00/360_F_664800080_DB9Ed3O11GxDt0gPXtsqajrNDV52V84M.jpg";
  const formattedDate = content.releaseDate ? new Date(content.releaseDate).toLocaleDateString("fr-FR") : null;

  return (
    <Div classname="flex flex-col md:flex-row gap-8">
      <Div classname="w-full md:w-1/3">
        <Image
          classname="w-full rounded-lg"
          src={moviePoster}
          alt={content.title}
        />
      </Div>

      <Div classname="flex-1">
        <H1 classname="text-3xl font-bold mb-4" content={content.title} />
        {content.type && (
          <p className="text-sm text-red-500 mb-2">{content.type}</p>
        )}

        {formattedDate && (
          <p className="text-sm text-gray-400 mb-4">
            Publié le : {formattedDate}
          </p>
        )}

        {content.description && (
          <p className="text-gray-200">{content.description}</p>
        )}

        {content.entrances != null && (
          <p className="mt-4 text-gray-400">
            {content.entrances} entrées
          </p>
        )}
      </Div>
    </Div>
  );
}

export default MovieDetail;
