import type { ApiResourceBase, Collection } from "@/types/Api";

type UserBase = ApiResourceBase & {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  dateOfBirth: string;
  createdAt: string;
  avatar?: string | null;
};

type UserProps = UserBase & {
  interactions?: ReadonlyArray<string> | null;
  sentFriendRequests?: ReadonlyArray<UserBase> | null;
  receivedFriendRequests?: ReadonlyArray<UserBase> | null;
};

export type User = UserProps & {
  user: UserProps;
};

export type UsersCollection = Collection<User>;
