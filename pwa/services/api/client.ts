import { Content } from "@/types/molecules";
import {User} from "@/types/UsersApi";
import { Friendship } from "@/types/FriendshipsApi";
import type {CollectionView} from "@/types/Api";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API ?? 'https://localhost';

export type APIPlatformListResponse<T> = {
  "@context": string;
  member: ReadonlyArray<T>;
  view: CollectionView;
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

interface Normalizer<T, U = T> {
  normalize: (item: T) => U
}

abstract class APIPlatformClient<T> extends HTTPClient {
  private baseURL: string;
  protected abstract resource: string;
  protected normalizer?: Normalizer<T>;

  constructor() {
    super();
    this.baseURL = API_BASE_URL;
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

  getList(urlParameters?: URLSearchParams | null): Promise<APIPlatformListResponse<T>> {
    console.log("API =>", process.env.NEXT_PUBLIC_API);

    return this.get(`${this.baseURL}/${this.resource}?${urlParameters?.toString()}`, this.getCommonHeaders()).then((response: APIPlatformListResponse<T>) => {
      if (this.normalizer) {
        response.member = response.member.map(this.normalizer.normalize)
      }

      return response
    });
  }

  getItem(id: string): Promise<T> {
    return this.get(`${this.baseURL}/${this.resource}/${id}`, this.getCommonHeaders()).then((response) => response);
  }

  create(body: any): Promise<T> {
    const headers: Record<string, string> = {
      ...this.getCommonHeaders(),
      "Content-Type": "application/ld+json"
    }

    return this.post(`${this.baseURL}/${this.resource}`, headers, JSON.stringify(body)).then((response) => response);
  }

  update(id: string, body: any) {
    const headers: Record<string, string> = {
      ...this.getCommonHeaders(),
      "Content-Type": "application/merge-patch+json"
    }
    return this.patch(`${this.baseURL}/${this.resource}/${id}`, headers, JSON.stringify(body)).then((response) => response);
  }

  remove(id: string) {
    return this.delete(`${this.baseURL}/${this.resource}/${id}`, this.getCommonHeaders());
  }
}

class ContentNormalizer implements Normalizer<Content> {
  normalize(item: Content): Content {
    item.poster = `https://image.tmdb.org/t/p/original${item.poster}`

    return item;
  }
}

export class ContentClient extends APIPlatformClient<Content> {
  protected resource = 'contents';
  protected normalizer = new ContentNormalizer()
}

export class UserClient extends APIPlatformClient<User> {
  protected resource = 'users';
}

export class FriendshipClient extends APIPlatformClient<Friendship> {
  protected resource = 'friendships';

  getUsersFrienship(authenticatedUserId: string, userDetailId: string): Promise<Friendship> {
    return this.get(`${API_BASE_URL}/${this.resource}/${authenticatedUserId}/${userDetailId}`, this.getCommonHeaders());
  }
}
