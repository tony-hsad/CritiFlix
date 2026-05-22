import type { Friendship, FriendshipsCollection } from "@/types/FriendshipsApi";
import { User } from "@/types/UsersApi";

export function getUsersFromFriendship(friendships: FriendshipsCollection, me: User) {
  return friendships.member.map((friendship: Friendship) => {
    return friendship.sender.id === me.id ? friendship.receiver : friendship.sender;
  });
}
