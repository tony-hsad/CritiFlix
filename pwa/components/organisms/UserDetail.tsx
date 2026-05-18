import Chip from "../atoms/Chip";
import H1 from "../atoms/H1";
import Image from "../atoms/Image";
import Link from "../atoms/Link";
import type { User } from "@/types/UsersApi";

function MovieDetail({ user }: User) {
  const userAvatar = user.avatar || "https://t3.ftcdn.net/jpg/06/64/80/00/360_F_664800080_DB9Ed3O11GxDt0gPXtsqajrNDV52V84M.jpg";
  const formattedBirthDate = new Date(user.dateOfBirth).toLocaleDateString("fr-FR");
  const formattedCreatedDate = new Date(user.createdAt).toLocaleDateString("fr-FR");

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/3">
        <Image
          classname="rounded-lg"
          src={userAvatar}
          alt={`Avatar de ${user.firstname} ${user.lastname}`}
        />
      </div>

      <div className="flex flex-col gap-3">
        <H1 classname="text-3xl font-bold mb-4" content={`Informations de ${user.firstname} ${user.lastname}`} />

        <p>
          Prénom :
          <span className="font-bold"> {user.lastname}</span>
        </p>

        <p>
          Nom :
          <span className="font-bold uppercase"> {user.lastname}</span>
        </p>

        <span>
          Email :
          <Link to={`mailto:${user.email}`} classname="font-bold italic" target="_self" content={` ${user.email}`} />
        </span>

        <p>
          Né le
          <span className="font-bold"> {formattedBirthDate}</span>
        </p>

        <p>
          Existe depuis le
          <span className="font-bold"> {formattedCreatedDate}</span>
        </p>
      </div>
    </div>
  );
}

export default MovieDetail;
