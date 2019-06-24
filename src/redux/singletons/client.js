class Client {
  constructor() {
    this.baseURL = 'https://instaclone-api.now.sh';
    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
  }

  async post(url, payload) {
    const _response = fetch(`${this.baseURL}${url}`, {
      headers: this.headers,
      method: 'POST',
      body: JSON.stringify(payload)
    });
    const response = await _response.json();
    return response;
  }
}

const client = new Client();
export default client;
