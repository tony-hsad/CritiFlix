import { Content, ContentsCollection } from "@/types/molecules";
import {User, UsersCollection} from "@/types/UsersApi";
import { Friendship, FriendshipsCollection } from "@/types/FriendshipsApi";
import { API_BASE_URL } from "./authApi";

export type APIPlatformListResponse<T> = {
  "@context": string;
  member: ReadonlyArray<T>;
}

class HTTPClient {
  fetch(url: string, method: string, headers?: Record<string, string>, body?: BodyInit | null) {
    return fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...headers
      },
      body: body,
    });
  }

  get(url: string, headers: Record<string, string>) {
    return this.fetch(url, "GET", headers)
      .then((response) => {
        if (!response.ok) {
          throw response.status;
        }
        return response.json();
    });
  }

  post(url: string, headers: Record<string, string>, body?: BodyInit | null) {
    return this.fetch(url, "POST", headers, body)
      .then((response) => {
        if (!response.ok) {
          throw response.status;
        }
        return response.json();
    });
  }

  patch(url: string, headers: Record<string, string>, body?: BodyInit | null) {
    return this.fetch(url, "PATCH", headers, body)
      .then((response) => {
        if (!response.ok) {
          throw response.status;
        }
        return response.json();
    });
  }

  delete(url: string, headers: Record<string, string>) {
    return this.fetch(url, "DELETE", headers);
  }
}

abstract class APIPlatformClient<T, TC> extends HTTPClient {
  private baseURL: string;
  protected abstract resource: string;

  constructor() {
    super();
    this.baseURL = "https://localhost";
  }

  protected getCommonHeaders() {
    const headers: Record<string, string> = {};

    if (typeof window !== "undefined" && window.localStorage) {
      const token: string | null = localStorage.getItem("jwt_token");

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  getList(urlParameters?: URLSearchParams | null): Promise<APIPlatformListResponse<TC>> {
    return this.get(`${this.baseURL}/${this.resource}?${urlParameters?.toString()}`, this.getCommonHeaders()).then((response) => response);
  }

  getItem(id: number): Promise<APIPlatformListResponse<T>> {
    return this.get(`${this.baseURL}/${this.resource}/${id}`, this.getCommonHeaders()).then((response) => response);
  }

  create(body: any): Promise<APIPlatformListResponse<T>> {
    const headers: Record<string, string> = {
      ...this.getCommonHeaders(),
      "Content-Type": "application/ld+json"
    }

    return this.post(`${this.baseURL}/${this.resource}`, headers, body).then((response) => response);
  }

  update(id: number, body: any) {
    const headers: Record<string, string> = {
      ...this.getCommonHeaders(),
      "Content-Type": "application/merge-patch+json"
    }
    return this.patch(`${this.baseURL}/${this.resource}/${id}`, headers, body).then((response) => response);
  }

  remove(id: number) {
    return this.delete(`${this.baseURL}/${this.resource}/${id}`, this.getCommonHeaders());
  }
}

export class ContentClient extends APIPlatformClient<Content, ContentsCollection> {
  protected resource = 'contents';
}

export class UserClient extends APIPlatformClient<User, UsersCollection> {
  protected resource = 'users';
}

export class FriendshipClient extends APIPlatformClient<Friendship, FriendshipsCollection> {
  protected resource = 'friendships';

  getUsersFrienship(authenticatedUserId: number, userDetailId: number): Promise<APIPlatformListResponse<Friendship>> {
    const url = `${API_BASE_URL}/${this.resource}/${authenticatedUserId}/${userDetailId}`;
    return this.get(url, this.getCommonHeaders());
  }
}
