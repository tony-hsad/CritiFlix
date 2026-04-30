type UserBase = {
  "@id": string;
  "@type": string;
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  dateOfBirth: string;
  createdAt: string;
};

type UserProps = UserBase & {
  interactions?: string[] | null;
  friends?: UserBase[] | null;
};

export type User = {
  user: UserProps;
};
