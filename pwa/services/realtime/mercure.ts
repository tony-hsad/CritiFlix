const BASE_API_URL = 'https://localhost'
const BASE_MERCURE_URL = `${BASE_API_URL}/.well-known/mercure`

type IncomeMessage = {
  data: string;
  lastEventId: string;
  type: "message" | string;
};

type AppMessage = Omit<IncomeMessage, 'data'> & {
  data: Record<string, any>;
}

export class Mercure {
  static subscribed: Record<string, EventSource> = {};

  static subscribe(id: string, topic: string, callback: (message: AppMessage) => void) {
    if (!this.subscribed[id]) {
      const es = new EventSource(`${BASE_MERCURE_URL}?${new URLSearchParams({ topic: `${BASE_API_URL}${topic}` }).toString()}`);
      es.onmessage = (msg) => {
        callback({ lastEventId: msg.lastEventId, type: msg.type, data: JSON.parse(msg.data) })
      }

      this.subscribed[id] = es;
    }

    return this.subscribed[id]
  }
}
