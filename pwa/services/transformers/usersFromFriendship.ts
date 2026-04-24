import type { Friendship, FriendshipsCollection } from "@/types/FriendshipsApi";

export function getUsersFromFriendship(friendships: FriendshipsCollection, userId: number) {
  return friendships.member.map((friendship: Friendship) => {
    return friendship.sender.id === userId ? friendship.receiver : friendship.sender;
  });
}
