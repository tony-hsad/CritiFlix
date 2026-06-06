import type { Interaction } from "@/types/InteractionApi";
import type { APIPlatformListResponse } from "./client";
import { InteractionClient } from "./client";

export function getInteractionsByContent(contentId: number): Promise<APIPlatformListResponse<Interaction>> {
  const params = new URLSearchParams();
  params.set("associatedContent", `/contents/${contentId}`);

  return new InteractionClient().getList(params);
}



