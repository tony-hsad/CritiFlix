import { ROUTES_API } from "../../routes/routes";
import { getMe, logout } from "./authApi";
import type {Friendship, FriendshipsCollection } from "@/types/FriendshipsApi";
import { getUsersFromFriendship } from "../transformers/usersFromFriendship";

export const API_BASE_URL = "https://localhost";

export function sendFriendRequest(userReceiverId: number): Promise<Friendship> {
  const token = localStorage.getItem("jwt_token");
  const headers: HeadersInit = {
    "Content-Type": "application/ld+json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return fetch(`${API_BASE_URL}${ROUTES_API.FRIENDSHIPS}`, {
    method: "POST",
    headers,
    body: JSON.stringify({receiver: `/users/${userReceiverId}`})
  })
    .then((response) => {
      const isUserUnauthorized = response.status === 401;
      if (isUserUnauthorized) {
        logout();
      }

      if (!response.ok) {
        throw response.status;
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
}

export function setFriendRequest(friendshipId:number, isAccept: boolean): Promise<Friendship> {
  const token = localStorage.getItem("jwt_token");
  const headers: HeadersInit = {
    "Content-Type": "application/merge-patch+json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return fetch(`${API_BASE_URL}${ROUTES_API.FRIENDSHIPS}/${friendshipId}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({status: isAccept ? "accepted": "rejected"})
  })
  .then((response)=> {
    if (!response.ok) {
      throw response.status;
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
}

export function getSentFriendRequests(userId: number): Promise<Friendship> {
  const token = localStorage.getItem("jwt_token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return fetch(`${API_BASE_URL}${ROUTES_API.FRIENDSHIPS}?sender_id=${userId}&status=pending`,  {
    headers
  })
    .then((response) => {
      if (!response.ok) {
        throw response.status;
      }
      return response.json();
    })
    .then((data) => {
      const usersReceived = data.member.map((friendship: Friendship) => {
        return friendship.receiver;
      });
      return { ...data, member: usersReceived };
    })
    .catch((error) => {
      throw error;
    });
}

export function getReceivedFriendRequests(userId: number){
  const token = localStorage.getItem("jwt_token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return fetch(`${API_BASE_URL}${ROUTES_API.FRIENDSHIPS}?receiver_id=${userId}&status=pending`, {
    headers,
  })
    .then((response)=> {
      if (!response.ok){
        throw response.status;
      }

      return response.json();
    })
    .then((data) => {
      const users = data.member.map((friendship: Friendship) => {
        return friendship.sender;
      });

      return { ...data, member: users };
    })
    .catch((error) => {
      throw error;
    });
}

export function getFriends(urlParameters: URLSearchParams): Promise<FriendshipsCollection> {
  const token = localStorage.getItem("jwt_token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return getMe()
    .then((me) => {
      return fetch(`${API_BASE_URL}${ROUTES_API.FRIENDSHIPS}?status=accepted&${urlParameters.toString()}`, {
        headers
      })
        .then((response) => {
          if (!response.ok) {
            throw response.status;
          }

          return response.json();
        })
        .then((data) => {
          const friends = getUsersFromFriendship(data, me);
          return { ...data, member: friends };
        })
        .catch((error) => {
          throw error;
        });
    });
}
