import type { ApiResourceBase, Collection } from "@/types/Api";
import {User} from "@/types/UsersApi";

type FriendshipStatusEnum = 'pending' | 'accepted' | 'rejected';

export type Friendship = ApiResourceBase & {
  id: number;
  sender: User;
  receiver: User;
  status: FriendshipStatusEnum;
  requestDate: string;
  acceptedAt?: string | null;
};

export type FriendshipsCollection = Collection<Friendship>;
