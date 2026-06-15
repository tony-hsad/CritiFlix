import React, {useState} from "react";

import Button from "../atoms/Button";

import {sendInteraction} from "../../services/api/interactionsApi";
import type {Content} from "@/types/molecules";
import type {User} from "@/types/UsersApi";

const COMMENTS_FIELD_LIMIT = 1000;

type InteractionsFormProps = {
  content: Content;
  authenticatedUser?: User | undefined;
}

function InteractionForm({ content, authenticatedUser }: InteractionsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newIsLiked, setNewIsLiked] = useState<boolean>(true);
  const [currentComment, setCurrentComment] = useState<string>("");
  const [error, setError] = useState(null);
  const [errorComment, setErrorComment] = useState<string | null>(null);

  const rateOptions = [1, 2, 3, 4,5];
  const MAX_OPTIONS = rateOptions.length;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const form = document.querySelector("form");
    const formData = new FormData(form ?? undefined);
    const interactionData = {
      comment: formData.get("comment")?.toString() || '',
      rate: Number(formData.get("rate")) || 0,
      isLiked: newIsLiked || true,
    }

    setIsSubmitting(true);

    sendInteraction(interactionData.isLiked, interactionData.rate, interactionData.comment, `/contents/${content.id}`, `/users/${authenticatedUser?.id}`)
      .then(() => {
        if (form) {
          form.reset();
        }

        setNewIsLiked(interactionData.isLiked);
        setCurrentComment("");
        setErrorComment(null);
      })
      .catch(() => {
        setError("Une erreur est survenue lors de la publication.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentComment(e.target.value);

    if (!e.target.value?.trim()) {
      setErrorComment("Vous ne pouvez pas envoyer de commentaires vides");
      return;
    }

    if (e.target.value.length > COMMENTS_FIELD_LIMIT) {
      setErrorComment(`Vous ne pouvez pas dépasser ${COMMENTS_FIELD_LIMIT} caractères dans votre commentaire`);
      return;
    }

    setErrorComment(null);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg flex flex-col gap-2">
      <h4 className="text-lg font-semibold text-white">Publier un commentaire</h4>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex flex-wrap gap-6 items-center">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Votre note :</label>
          <select
            name="rate"
            defaultValue={3}
            className="bg-gray-800 text-white p-2 rounded border border-gray-700 focus:outline-none focus:border-violet-500"
          >
            {rateOptions.map((value: number) => <option key={value} value={value}>{value}/{MAX_OPTIONS}</option>)}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Aimez vous ce contenu ?</label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant={newIsLiked ? "green" : "ghost"}
              onClick={() => setNewIsLiked(true)}
              icon={{ name: "like", size: "small"}}
            />

            <Button
              type="button"
              variant={newIsLiked ? "ghost" : "secondary"}
              onClick={() => setNewIsLiked(false)}
              icon={{ name: "dislike", size: "small" }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <textarea
          name="comment"
          placeholder="Écrivez votre commentaire ici..."
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleTextChange(e)}
          className="bg-gray-800 text-white p-3 rounded w-full border border-gray-700 focus:outline-none focus:border-violet-500"
          rows={3}
        />
        <span className="text-xs text-orange-100 text-right">{currentComment.length}/1000</span>
      </div>

      <div className="flex justify-end">
        <Button type="submit" variant={errorComment || !currentComment.trim() ? "ghost" : "green"} disabled={!!errorComment || !currentComment.trim() || isSubmitting}>
          {isSubmitting ? "Publication..." : "Publier un commentaire"}
        </Button>
      </div>
    </form>
  );

}

export default InteractionForm;
