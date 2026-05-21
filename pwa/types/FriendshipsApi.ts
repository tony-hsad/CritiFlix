import type { ApiResourceBase, Collection } from "@/types/Api";

type FriendshipStatusEnum = 'pending' | 'accepted' | 'rejected';

type FriendshipBase = ApiResourceBase & {
  id: number;
  sender: string;
  receiver: string;
  status: FriendshipStatusEnum;
  requestDate: string;
  acceptedAt?: string | null;
};

export type Friendship = FriendshipBase & {
  friendship: FriendshipBase;
};

export type FriendshipsCollection = Collection<Friendship>;
