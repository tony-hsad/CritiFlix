import type { Interaction } from "@/types/InteractionApi";
import {APIPlatformListResponse, ContentClient, FriendshipClient} from "./client";
import { InteractionClient } from "./client";

export function getInteractionsByContent(contentId: number): Promise<APIPlatformListResponse<Interaction>> {
  const params = new URLSearchParams();
  params.set("associatedContent", `/contents/${contentId}`);

  return new InteractionClient().getList(params);
}

export function sendInteraction(isLiked: boolean, rate: number, comment: string, content: string, user: string): Promise<Interaction> {
  const body = {
    isLiked,
    rate,
    comment,
    associatedContent: content,
    associatedUser: user,
    date: new Date().toISOString()
  };

  return new InteractionClient().create(body);
}

export function updateInteraction(interaction: Interaction): Promise<APIPlatformListResponse<Interaction>> {
  const interactionFields = {isLiked: interaction.isLiked, rate: interaction.rate, comment: interaction.comment};

  return new InteractionClient().update(interaction.id.toString(), interactionFields);
}

export function deleteInteraction(interactionId:number): Promise<Response> {
  return new InteractionClient().remove(interactionId.toString());
}
