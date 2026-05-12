import Image from "../atoms/Image";
import type { User } from "@/types/UsersApi";

function UserCard({ user }: User) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg bg-gray-900 shadow-lg transition-transform hover:scale-105 hover:shadow-2xl">
      <a href={`/users/${user.id}`}>
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-800">
          <Image
            src={user.avatar}
            alt={`Avatar de ${user.firstname} ${user.lastname}`}
            classname="transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute left-2 right-2 top-2 flex items-start justify-between gap-2">
            {user.firstname && (
              <span className="rounded-full bg-black px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-orange-400 shadow-md">
                {user.firstname}
              </span>
            )}

            {user.lastname && (
              <span className="rounded border border-red-500 bg-black/70 px-1.5 py-0.5 text-xs font-bold text-red-400 backdrop-blur-sm">
                {user.lastname}
              </span>
            )}
          </div>
        </div>
      </a>

      <div className="flex flex-1 flex-col p-3">
        <p className="mb-1 line-clamp-1 text-sm font-bold text-white">
          {user.email}
        </p>
      </div>
    </article>
  );
}

export default UserCard;
