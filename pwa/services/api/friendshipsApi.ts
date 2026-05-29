import { ROUTES_API } from "../../routes/routes";
import { logout } from "./authApi";
import type {Friendship} from "@/types/FriendshipsApi";
import type { UsersCollection } from "@/types/UsersApi";
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
  });
}

export function getSentFriendRequests(userId: number): Promise<UsersCollection> {
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
      return usersReceived;
    });
}

export function getReceivedFriendRequests(userId: number): Promise<UsersCollection> {
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
      const usersSent = data.member.map((friendship: Friendship) => {
        return friendship.sender;
      });
      return usersSent;
    });
}

export function getFriendshipByUsers(authenticatedUserId: number, userDetailId: number): Promise<Friendship> {
  const token = localStorage.getItem("jwt_token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return fetch(`${API_BASE_URL}${ROUTES_API.FRIENDSHIPS}/${authenticatedUserId}/${userDetailId}`, {
    headers
  }).then((response) => {
    const isAuthenticatedSender = response.ok;
    if (!isAuthenticatedSender || response.status === 404) {
      return fetch(`${API_BASE_URL}${ROUTES_API.FRIENDSHIPS}/${userDetailId}/${authenticatedUserId}`, {
        headers
      }).then((response) => {
        if (!response.ok){
          throw response.status;
        }

        return response.json();
      })
    }

    return response.json();
  });
}

export function deleteFriendship(friendshipId: number): Promise<void> {
  const token = localStorage.getItem("jwt_token");
  const headers: HeadersInit = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return fetch(`${API_BASE_URL}${ROUTES_API.FRIENDSHIPS}/${friendshipId}`, {
    method: "DELETE",
    headers
  })
    .then((response)=> {
      if (!response.ok) {
        throw response.status;
      }
    });
}

export function getFriends(authenticatedUserId: number, urlParameters: URLSearchParams): Promise<UsersCollection> {
  const token = localStorage.getItem("jwt_token");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

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
      const friends = getUsersFromFriendship(data, authenticatedUserId);
      return { ...data, member: friends };
    });
}
