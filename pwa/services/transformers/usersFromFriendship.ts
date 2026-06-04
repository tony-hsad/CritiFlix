import type { Friendship, FriendshipsCollection } from "@/types/FriendshipsApi";
import {APIPlatformListResponse} from "../api/client";

export function getUsersFromFriendship(friendships: ReadonlyArray<Friendship>, userId: string) {
  return friendships.map((friendship: Friendship) => {
    return friendship.sender.id === userId ? friendship.receiver : friendship.sender;
  });
}
