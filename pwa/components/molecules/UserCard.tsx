import Image from "../atoms/Image";
import type { User } from "@/types/UsersApi";

function UserCard(user: User) {
  const formattedCreatedDate = new Date(user.createdAt).toLocaleDateString("fr-FR");

  return (
    <article className="group overflow-hidden rounded-lg bg-orange-100 shadow-lg transition-transform hover:scale-103 hover:shadow-2xl">
      <a href={`/users/${user.id}`} className="flex grow-3 items-center gap-4 p-4">
        <div className="w-24 h-24 shrink-0 overflow-hidden rounded-lg">
          <Image
            src={user.avatar ?? ''}
            alt={`Avatar de ${user.firstname} ${user.lastname}`}
          />
        </div>

        <div className="flex flex-col grow gap-8 justify-between">
          <div className="flex justify-between items-center gap-2">
            <span className="uppercase border-red-500 text-violet-500 font-bold">
              {user.lastname}
            </span>
            <span className="text-violet-500 font-bold">
              {user.firstname}
            </span>
          </div>

          <span className="text-emerald-400 font-bold">
            Existe depuis le : {formattedCreatedDate}
          </span>
        </div>
      </a>
    </article>
  );
}

export default UserCard;
