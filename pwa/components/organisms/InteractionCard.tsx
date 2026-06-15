import React, { useState } from "react";
import Button from "../atoms/Button";
import Chip from "../atoms/Chip";
import Icon from "../atoms/Icon";
import { updateInteraction, deleteInteraction } from "../../services/api/interactionsApi";
import type { Interaction } from "@/types/InteractionApi";
import type { User } from "@/types/UsersApi";

type InteractionCardProps = {
  interaction: Interaction;
  authenticatedUser?: User | undefined;
}

const COMMENTS_FIELD_LIMIT = 1000;

function InteractionCard({ interaction, authenticatedUser }: InteractionCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentComment, setCurrentComment] = useState(interaction.comment);

  const handleUpdate = () => {
    setIsLoading(true);
    updateInteraction({...interaction, comment: currentComment})
      .then(() => {
        interaction.comment = currentComment;
      })
      .finally(() => {
        setIsLoading(false);
        setIsEditing(false);
      });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError(null);
    setCurrentComment(interaction.comment);
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentComment(e.target.value);
    if (!e.target.value || e.target.value.trim() === "") {
      setError("Vous ne pouvez pas envoyer de commentaires vides");
      return;
    }

    if (e.target.value.length > COMMENTS_FIELD_LIMIT) {
      setError(`Vous ne pouvez pas dépasser ${COMMENTS_FIELD_LIMIT} caractères dans votre commentaire`);
      return;
    }

    setError(null);
  };

  const formattedDate = new Date(interaction.date).toLocaleDateString("fr-FR");
  const user = interaction.associatedUser;

  return (
    <div className="bg-gray-800 p-4 rounded-lg flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex flex-row gap-2">
          <img width={40} height={40} src={user.avatar} alt={`Avatar de ${user.firstname} ${user.lastname}`} />
          <p className="text-violet-500 text-center font-bold">{user.firstname} {user.lastname}</p>
          <Chip className="text-sm text-yellow-500 flex gap-2 m-auto">
            <Icon name="star" />
            {interaction.rate || 0.0}/5
          </Chip>
        </div>

        <span className="text-xs text-gray-500">
          Publié le {formattedDate}
        </span>
      </div>

      {isEditing ? (
        <div className="flex flex-col gap-2 mt-2">
          <textarea
            value={currentComment}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange(e)}
            className="bg-gray-700 text-white p-2 rounded w-full"
            rows={3}
          />
          <span>{currentComment.length}/1000</span>
          {error && <span className="text-red-500">{error}</span>}
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={handleCancel} disabled={isLoading}>
              Annuler
            </Button>

            <Button variant={error ? "ghost" : "green"} onClick={handleUpdate} disabled={error}>
              {isLoading ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-gray-300 mt-1">{interaction.comment}</p>

          {authenticatedUser?.id === user.id && (
            <div className="flex justify-end gap-4">
              <Button variant="green" icon={{ name: "edit"}} onClick={() => setIsEditing(true)}>
                Modifier le message
              </Button>

              <Button variant="secondary" icon={{ name: "delete" }} onClick={() => deleteInteraction(interaction.id)}>
                Supprimer le message
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default InteractionCard;
