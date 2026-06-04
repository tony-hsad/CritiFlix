import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Chip from "../atoms/Chip";
import Button from "../atoms/Button";
import H1 from "../atoms/H1";
import Icon from "../atoms/Icon";
import Image from "../atoms/Image";
import Link from "../atoms/Link";
import type { User } from "@/types/UsersApi";
import { useAuth } from "../../contexts/providers/AuthContextProvider";
import {getFriendshipByUsers, sendFriendRequest, setFriendRequest, deleteFriendship} from "../../services/api/friendshipsApi";
import { ROUTES } from "../../routes/routes";
import {Friendship} from "@/types/FriendshipsApi";

type UserDetailProps = {
  user: User;
};

function UserDetail({ user }: UserDetailProps) {
  const { user: authenticatedUser } = useAuth();
  const userAvatar = user.avatar || "https://t3.ftcdn.net/jpg/06/64/80/00/360_F_664800080_DB9Ed3O11GxDt0gPXtsqajrNDV52V84M.jpg";
  const formattedBirthDate = new Date(user.dateOfBirth).toLocaleDateString("fr-FR");
  const formattedCreatedDate = new Date(user.createdAt).toLocaleDateString("fr-FR");
  const router = useRouter();

  const [friendship, setFriendship] = useState<Friendship>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);

    getFriendshipByUsers(authenticatedUser?.id ?? '', user?.id)
      .then(setFriendship)
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });

  }, [authenticatedUser?.id, user?.id]);

  const sendRequest = (receiverId: string) => {
    sendFriendRequest(receiverId).then((updatedFriendship) => {
      setFriendship(updatedFriendship);
    });
  };

  const removeFriendship = (friendshipId: string) => {
    deleteFriendship(friendshipId)
      .then(() => {
        setFriendship(undefined);
      });
  };

  const updateStatus = (friendshipId: string, status: 'accepted' | 'rejected') => {
    setFriendRequest(friendshipId, status)
      .then((updatedFriendship) => {
        setFriendship(updatedFriendship);
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-1/3">
        <Image
          className="rounded-lg"
          src={userAvatar}
          alt={`Avatar de ${user.firstname} ${user.lastname}`}
        />
      </div>

      <div className="flex flex-col gap-3">
        <H1 className="text-3xl font-bold mb-4" content={`Informations de ${user.firstname} ${user.lastname}`} />

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
          <Link to={`mailto:${user.email}`} className="font-bold italic" target="_self" content={` ${user.email}`} />
        </span>

        <p>
          Né le
          <span className="font-bold"> {formattedBirthDate}</span>
        </p>

        <p>
          Existe depuis le
          <span className="font-bold"> {formattedCreatedDate}</span>
        </p>


        {authenticatedUser && authenticatedUser?.id !== user?.id && !isLoading && (
          <div className="flex flex-row gap-2">
            <Button variant="green" onClick={() => router.push(`mailto:${user.email}`)} icon={{name: "contact" }}>
              Contacter
            </Button>

            {!friendship && (
              <Button icon={{ name: 'plus' }} onClick={() => sendRequest(user.id)}>
                Demander en ami
              </Button>
            )}

            {friendship && friendship.status === 'pending' && (
              <div className="flex flex-row">
                {friendship.sender.id === authenticatedUser.id ? (
                  <div className="flex flex-row gap-2 items-center">
                    <Button variant="secondary" icon={{name: "removeFriend" }} onClick={() => removeFriendship(friendship.id)}>
                      Annuler la demande
                    </Button>

                    <Chip className="bg-black inline-flex items-center tracking-wide text-orange-400 shadow-md">
                      Demande en attente
                    </Chip>
                  </div>
                ) : (
                  <div className="flex flex-row gap-2">
                    <Button variant="green" icon={{name: "acceptFriend" }} onClick={() => updateStatus(friendship.id, 'accepted')}>
                      Accepter la demande
                    </Button>

                    <Button variant="secondary" icon={{name: "removeFriend" }} onClick={() => updateStatus(friendship.id, 'rejected')}>
                      Refuser la demande
                    </Button>
                  </div>
                )}
              </div>
            )}

            {friendship && friendship.status === 'accepted' && (
              <div className="flex flex-row gap-2 items-center">
                <Button variant="secondary" icon={{name: "removeFriend" }} onClick={() => removeFriendship(friendship.id)}>
                  Retirer des amis
                </Button>

                <Chip className="bg-black inline-flex items-center tracking-wide text-orange-400 shadow-md">
                  Vous êtes amis
                </Chip>
              </div>
            )}
          </div>
        )}

        {authenticatedUser && authenticatedUser?.id === user?.id && (
          <div className="flex space-x-2">
            <Button variant="green" icon={{name: "friends" }} onClick={() => router.push(ROUTES.FRIENDS)}>
              Voir mes amis
            </Button>

            <Button variant="green" icon={{name: "friends" }} onClick={() => router.push(ROUTES.FRIENDS_REQUESTS)}>
              Voir mes demandes d&apos;amis
            </Button>
          </div>
        )}

      </div>
    </div>
  );
}

export default UserDetail;
