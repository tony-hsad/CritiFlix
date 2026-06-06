import type { ApiResourceBase, Collection } from "@/types/Api";
import type { User } from "@/types/UsersApi";

export type Interaction = ApiResourceBase & {
  id: number;
  isLiked: boolean;
  rate: number;
  comment: string;
  date: string;
  associatedUser: User;
  associatedContent: string;
};

export type InteractionsCollection = Collection<Interaction>;
