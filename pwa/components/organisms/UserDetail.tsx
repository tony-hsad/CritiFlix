import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Button from "../atoms/Button";
import H1 from "../atoms/H1";
import Icon from "../atoms/Icon";
import Image from "../atoms/Image";
import Link from "../atoms/Link";
import type { User } from "@/types/UsersApi";
import { useAuth } from "../../contexts/providers/AuthContextProvider";
import {getFriendshipByUsers, sendFriendRequest, setFriendRequest} from "../../services/api/friendshipsApi";
import { ROUTES } from "../../routes/routes";

function UserDetail({ user }: User) {
  const { user: authenticatedUser } = useAuth();
  const userAvatar = user.avatar || "https://t3.ftcdn.net/jpg/06/64/80/00/360_F_664800080_DB9Ed3O11GxDt0gPXtsqajrNDV52V84M.jpg";
  const formattedBirthDate = new Date(user.dateOfBirth).toLocaleDateString("fr-FR");
  const formattedCreatedDate = new Date(user.createdAt).toLocaleDateString("fr-FR");
  const router = useRouter();

  const [friendship, setFriendship] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);

    getFriendshipByUsers(authenticatedUser.id, user.id)
      .then((data) => {
        setFriendship(data)
        console.log(friendship);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });

  }, [authenticatedUser, user]);

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


        {authenticatedUser && authenticatedUser.id !== user.id && !isLoading && (
          <div className="flex flex-wrap gap-2">
            <Button variant="green" onClick={() => router.push(`mailto:${user.email}`)} Icon={<Icon name="contact" />}>
              Contacter
            </Button>
            {!friendship || friendship.status === 'rejected' && (
              <Button Icon={<Icon name="plus" />} onClick={() => sendFriendRequest(user.id)}>
                Demander en ami
              </Button>
            )}

            {friendship && friendship.status === 'pending' && (
              <>
                {friendship.sender.id === authenticatedUser.id ? (
                  <span>
                    Demande envoyée
                  </span>
                ) : (
                  <>
                    <Button variant="green" Icon={<Icon name="friends" />} onClick={() => setFriendRequest(friendship, true)}>
                      Accepter la demande
                    </Button>

                    <Button variant="red" Icon={<Icon name="friends" />} onClick={() => setFriendRequest(friendship, false)}>
                      Refuser la demandde
                    </Button>
                  </>
                )}
              </>
            )}

            {friendship && friendship.status === 'accepted' && (
              <span>
                Vous êtes amis
              </span>
            )}


          </div>
        )}

        {authenticatedUser && authenticatedUser.id === user.id && (
          <div className="flex space-x-2">
            <Button variant="green" Icon={<Icon name="friends" />} onClick={() => router.push(ROUTES.FRIENDS)}>
              Voir mes amis
            </Button>

            <Button variant="green" Icon={<Icon name="friends" />} onClick={() => router.push(ROUTES.FRIENDS_REQUESTS)}>
              Voir mes demandes d'amis
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}

export default UserDetail;
