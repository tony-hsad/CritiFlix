import { FriendshipClient } from "./client";
import type {Friendship, FriendshipsCollection} from "@/types/FriendshipsApi";
import type {User, UsersCollection} from "@/types/UsersApi";
import type { APIPlatformListResponse } from "./client";
import { getUsersFromFriendship } from "../transformers/usersFromFriendship";

export function sendFriendRequest(userReceiverId: string): Promise<Friendship> {
  return new FriendshipClient().create({receiver: `/users/${userReceiverId}`});
}

export function setFriendRequest(friendshipId: string, status: 'accepted' | 'rejected'): Promise<Friendship> {
  return new FriendshipClient().update(friendshipId, { status });
}

export function getSentFriendRequests(userId: string) {
  return new FriendshipClient().getList(new URLSearchParams({ sender_id: userId, status: 'pending' }))
    .then((data) => {
      const usersReceived  = data.member.map((friendship: Friendship) => {
        return friendship.receiver;
      });
      return usersReceived;
    });
}

export function getReceivedFriendRequests(userId: string) {
  const myNewParams = new URLSearchParams();
  myNewParams.set("receiver_id", `${userId}`);
  myNewParams.set("status", "pending");

  return new FriendshipClient().getList(myNewParams)
    .then((data: APIPlatformListResponse<Friendship>) => {
      const usersSent = data.member.map((friendship: Friendship) => {
        return friendship.sender;
      });
      return usersSent;
    });
}

export function getFriendshipByUsers(authenticatedUserId: string, userDetailId: string): Promise<Friendship> {
  const friendshipClient = new FriendshipClient();

  return friendshipClient.getUsersFrienship(authenticatedUserId, userDetailId)
    .catch(() => {
      return friendshipClient.getUsersFrienship(userDetailId, authenticatedUserId);
    });
}

export function deleteFriendship(friendshipId: string) {
  return new FriendshipClient().remove(friendshipId);
}

export function getFriends(authenticatedUserId: string, urlParameters: URLSearchParams): Promise<APIPlatformListResponse<User>> {
  return new FriendshipClient().getList(new URLSearchParams({...urlParameters, status: 'accepted'}))
    .then((data) => {
      const friends = getUsersFromFriendship(data.member, authenticatedUserId);
      return { ...data, member: friends };
    });
}
