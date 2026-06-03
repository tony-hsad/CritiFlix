import { FriendshipClient } from "./client";
import type {Friendship, FriendshipsCollection} from "@/types/FriendshipsApi";
import type { UsersCollection } from "@/types/UsersApi";
import type { APIPlatformListResponse } from "./client";
import { getUsersFromFriendship } from "../transformers/usersFromFriendship";

export function sendFriendRequest(userReceiverId: number): Promise<APIPlatformListResponse<Friendship>> {
  const body = JSON.stringify({receiver: `/users/${userReceiverId}`});
  return new FriendshipClient().create(body);
}

export function setFriendRequest(friendshipId:number, isAccept: boolean): Promise<APIPlatformListResponse<Friendship>> {
  const body = JSON.stringify({status: isAccept ? "accepted": "rejected"});
  return new FriendshipClient().update(friendshipId, body);
}

export function getSentFriendRequests(userId: number): Promise<any> {
  const myNewParams = new URLSearchParams();
  myNewParams.set("sender_id", `${userId}`);
  myNewParams.set("status", "pending");

  return new FriendshipClient().getList(myNewParams)
    .then((data: APIPlatformListResponse<FriendshipsCollection>) => {
      const usersReceived  = data.member.map((friendship: Friendship) => {
        return friendship.receiver;
      });
      return usersReceived;
    });
}

export function getReceivedFriendRequests(userId: number): Promise<any> {
  const myNewParams = new URLSearchParams();
  myNewParams.set("receiver_id", `${userId}`);
  myNewParams.set("status", "pending");

  return new FriendshipClient().getList(myNewParams)
    .then((data: APIPlatformListResponse<FriendshipsCollection>) => {
      const usersSent = data.member.map((friendship: Friendship) => {
        return friendship.sender;
      });
      return usersSent;
    });
}

export function getFriendshipByUsers(authenticatedUserId: number, userDetailId: number): Promise<APIPlatformListResponse<Friendship>> {
  const friendshipClient = new FriendshipClient();

  return friendshipClient.getUsersFrienship(authenticatedUserId, userDetailId)
    .catch(() => {
      return friendshipClient.getUsersFrienship(userDetailId, authenticatedUserId);
    });
}

export function deleteFriendship(friendshipId: number) {
  return new FriendshipClient().remove(friendshipId);
}

export function getFriends(authenticatedUserId: number, urlParameters: URLSearchParams): Promise<APIPlatformListResponse<UsersCollection>> {
  const myNewParams: URLSearchParams = new URLSearchParams(urlParameters);
  myNewParams.set("status", "accepted");

  return new FriendshipClient().getList(myNewParams)
    .then((data: any) => {
      const friends = getUsersFromFriendship(data, authenticatedUserId);
      return { ...data, member: friends };
    });
}
