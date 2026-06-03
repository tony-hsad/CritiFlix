import type { ApiResourceBase, Collection } from "@/types/Api";

export type User = ApiResourceBase & {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  dateOfBirth: string;
  createdAt: string;
  avatar?: string | null;
  interactions?: ReadonlyArray<string> | null;
  sentFriendRequests?: ReadonlyArray<User> | null;
  receivedFriendRequests?: ReadonlyArray<User> | null;
};

export type UsersCollection = Collection<User>;
