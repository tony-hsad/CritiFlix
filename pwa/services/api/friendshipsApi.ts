import { ROUTES_API } from "../../routes/routes";
import { logout } from "./authApi";
import type { Friendship } from "@/types/FriendshipsApi";

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
    body: JSON.stringify({receiver: `/api/users/${userReceiverId}`})
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
