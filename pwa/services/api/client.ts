import { Content, ContentsCollection } from "@/types/molecules";

type APIPlatformListResponse<T> = {
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
    return this.fetch(url, "GET", headers).then((response) => response.json());
  }

  post(url: string, headers: Record<string, string>, body?: BodyInit | null) {
    return this.fetch(url, "POST", headers, body).then((response) => response.json());
  }

  patch(url: string, headers: Record<string, string>, body?: BodyInit | null) {
    return this.fetch(url, "PATCH", headers, body).then((response) => response.json());
  }

  delete(url: string, headers: Record<string, string>) {
    return this.fetch(url, "DELETE", headers);
  }
}

abstract class APIPlatformClient<T> extends HTTPClient {
  private baseURL: string;
  protected resource: string;

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

  getList(urlParameters?: URLSearchParams | null): Promise<APIPlatformListResponse<T>> {
    return this.get(`${this.baseURL}/${this.resource}?${urlParameters?.toString()}`, this.getCommonHeaders()).then((response) => response);
  }

  getItem(id: number) {
    return this.get(`${this.baseURL}/${this.resource}/${id}`, this.getCommonHeaders()).then((response) => response);
  }

  create(body: any) {
    return this.post(`${this.baseURL}/${this.resource}`, this.getCommonHeaders(), body).then((response) => response);
  }

  update(id: number, body: any) {
    return this.patch(`${this.baseURL}/${this.resource}/${id}`, this.getCommonHeaders(), body).then((response) => response);
  }

  remove(id: number) {
    return this.delete(`${this.baseURL}/${this.resource}/${id}`, this.getCommonHeaders());
  }
}

export class ContentClient extends APIPlatformClient<Content | ContentsCollection> {
  protected resource = 'contents';
}
