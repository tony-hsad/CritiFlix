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
