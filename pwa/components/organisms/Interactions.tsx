import React, { useState, useEffect } from "react";
import Icon from "../atoms/Icon";
import InteractionCard from "./InteractionCard";
import { getInteractionsByContent } from "../../services/api/interactionsApi";
import type { Content } from "@/types/molecules";
import type { User } from "@/types/UsersApi";
import type { Interaction } from "@/types/InteractionApi";
import type { APIPlatformListResponse } from "../../services/api/client";
import UserCard from "../molecules/UserCard";

type InteractionsProps = {
  content: Content;
  authenticatedUser?: User | undefined;
}

function Interactions({ content, authenticatedUser }: InteractionsProps) {
  const [interactions, setInteractions] = useState<ReadonlyArray<Interaction>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    getInteractionsByContent(content?.id)
      .then((data: APIPlatformListResponse<Interaction>) => {
        setInteractions(data.member);
      })
      .catch((err) => {
        setError(err.message);
    })
      .finally(() => {
      setIsLoading(false);
    });
  }, []);

  console.log(interactions);

  if (isLoading) {
    return (
      <p className="flex items-center justify-center gap-2 text-gray-400 py-12">
        <Icon name="loading" className="animate-spin" />
        Chargement...
      </p>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Erreur : {error}</p>
      </div>
    );
  }

  if (!interactions.length) {
    return <p className="text-center text-gray-400 py-12">Aucune interactions n'existe encore pour ce contenu.</p>;
  }

  const totalLikes = interactions.reduce((acc, interaction: Interaction) => acc + interaction.isLiked, 0);
  const rateAverage = interactions.reduce((sum, interaction: Interaction) => sum + interaction.rate, 0) / interactions.length || 0;
  const comments = interactions.map((interaction: Interaction) => interaction.comment);

  return (
    <div className="mt-8 border-t border-gray-800 pt-8">
      <div className="flex gap-8 mb-6 bg-gray-800 p-4 rounded-lg">
        <div>
          <p className="text-sm text-gray-400">Note moyenne</p>
          <p className="text-2xl font-bold text-yellow-400">{rateAverage.toFixed(1)}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">J'aimes</p>
          <p className="text-2xl font-bold text-blue-400">{totalLikes}</p>
        </div>
      </div>


      <h3 className="text-xl font-semibold mb-4">Il y a {comments.length} commentaires</h3>

      <div className="flex flex-col gap-4">
        {interactions.map((interaction: Interaction) => (
          <InteractionCard key={interaction.id} interaction={interaction} authenticatedUser={authenticatedUser} />
        ))}
      </div>
    </div>
  );
}

export default Interactions;
