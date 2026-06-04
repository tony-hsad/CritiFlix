import { UserClient } from "./client";
import type { User, UsersCollection } from "@/types/UsersApi"
import type { APIPlatformListResponse } from "./client"

export function getUsers(urlParameters: URLSearchParams): Promise<APIPlatformListResponse<User>> {
  return new UserClient().getList(urlParameters);
}

export function getUserById(id: string): Promise<User> {
  return new UserClient().getItem(id);
}
