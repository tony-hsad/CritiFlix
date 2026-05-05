import type { ApiResourceBase } from "@/types/Api";

type UserBase = ApiResourceBase & {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  dateOfBirth: string;
  createdAt: string;
};

type UserProps = UserBase & {
  interactions?: ReadonlyArray<string> | null;
  friends?: ReadonlyArray<UserBase> | null;
};

export type User = UserProps & {
  user: UserProps;
};
