import H1 from "../atoms/H1";
import Image from "../atoms/Image";
import type { Content } from "@/types/molecules";
import { useAuth } from "../../contexts/providers/AuthContextProvider";
import Interactions from "./Interactions";
import {TMDB_IMG_URL} from "../../services/api/contentsApi";

function MovieDetail(content: Content) {
  const { user: authenticatedUser } = useAuth();
  //const moviePoster = content.poster || "https://t3.ftcdn.net/jpg/06/64/80/00/360_F_664800080_DB9Ed3O11GxDt0gPXtsqajrNDV52V84M.jpg";
  const moviePoster = `${TMDB_IMG_URL}${content.poster}` || "https://t3.ftcdn.net/jpg/06/64/80/00/360_F_664800080_DB9Ed3O11GxDt0gPXtsqajrNDV52V84M.jpg";
  const formattedDate = content.releaseDate ? new Date(content.releaseDate).toLocaleDateString("fr-FR") : null;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <Image
            className="rounded-lg"
            src={moviePoster}
            alt={content.title}
          />
        </div>

        <div className="flex-1">
          <H1 className="text-3xl font-bold mb-4" content={content.title} />

          {content.type && <p className="text-sm text-red-500 mb-2">{content.type}</p>}
          {formattedDate && <p className="text-sm text-gray-400 mb-4">Publié le : {formattedDate}</p>}
          {content.description && <p className="text-gray-200">{content.description}</p>}
        </div>
      </div>

      <div className="w-full">
        <Interactions content={content} authenticatedUser={authenticatedUser} />
      </div>
    </div>
  );
}

export default MovieDetail;
