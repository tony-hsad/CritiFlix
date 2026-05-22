import type { ApiResourceBase, Collection } from "@/types/Api";
import {User} from "@/types/UsersApi";

type FriendshipStatusEnum = 'pending' | 'accepted' | 'rejected';

type FriendshipBase = ApiResourceBase & {
  id: number;
  sender: User;
  receiver: User;
  status: FriendshipStatusEnum;
  requestDate: string;
  acceptedAt?: string | null;
};

export type Friendship = FriendshipBase & {
  friendship: FriendshipBase;
};

export type FriendshipsCollection = Collection<Friendship>;
