class InstaError extends Error {
  constructor(error) {
    super('An error occurred in the API');
    this.error = error;
  }
}

class Client {
  constructor() {
    this.baseURL = 'https://instaclone-api.now.sh';
    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
  }

  async post(url, payload) {
    const _response = await fetch(`${this.baseURL}${url}`, {
      headers: this.headers,
      method: 'POST',
      body: JSON.stringify(payload)
    });
    const response = await _response.json();
    if (response.error) {
      throw new InstaError(response.error);
    }
    return response;
  }
}

const client = new Client();
export default client;
