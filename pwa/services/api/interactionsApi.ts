import type { Interaction } from "@/types/InteractionApi";
import type { APIPlatformListResponse } from "./client";
import { InteractionClient } from "./client";

export function getInteractionsByContent(contentId: number): Promise<APIPlatformListResponse<Interaction>> {
  const params = new URLSearchParams();
  params.set("associatedContent", `/contents/${contentId}`);

  return new InteractionClient().getList(params);
}

export function updateInteraction(interactionId:number, isLiked: boolean, rate: number, comment:string): Promise<APIPlatformListResponse<Interaction>> {
  const interactionFields = {isLiked: isLiked, rate: rate, comment: comment};

  return new InteractionClient().update(interactionId.toString(), interactionFields);
}

export function deleteInteraction(interactionId:number): Promise<Response> {
  return new InteractionClient().remove(interactionId.toString());
}
