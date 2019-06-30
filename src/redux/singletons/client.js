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
      'Content-Type': 'application/json',
      Authorization: null
    };
    this.client = ({ method, url, payload }) => {
      return fetch(`${this.baseURL}${url}`, {
        headers: this.headers,
        method,
        body: JSON.stringify(payload)
      });
    };
  }

  setAuthorization(secret) {
    this.headers.Authorization = `Bearer ${secret}`;
  }

  async get(path, query) {
    const url = `${path}/${query}`;
    const _response = await this.client({ method: 'GET', url });
    const response = await _response.json();
    if (response.error) {
      throw new InstaError(response.error);
    }
    return response;
  }

  async post(path, payload) {
    const _response = await this.client({ method: 'POST', url: path, payload });
    const response = await _response.json();
    if (response.error) {
      throw new InstaError(response.error);
    }
    return response;
  }
}

const client = new Client();
export default client;
