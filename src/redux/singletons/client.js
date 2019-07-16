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
      Authorization: null,
      Accept: 'application/json'
    };
    this.client = ({ method, url, payload }) => {
      let body;
      if (Object.prototype.toString.call(payload) === '[object FormData]') {
        delete this.headers['Content-Type'];
        body = payload;
      } else {
        this.headers['Content-Type'] = 'application/json';
        body = JSON.stringify(payload);
      }

      return fetch(`${this.baseURL}${url}`, {
        headers: this.headers,
        method,
        body
      });
    };
  }

  setAuthorization(secret) {
    this.headers.Authorization = `Bearer ${secret}`;
  }

  async get(path, params) {
    const url = `${path}/${params}`;
    const _response = await this.client({ method: 'GET', url });
    const response = await _response.json();
    if (response.error) {
      throw new InstaError(response.error);
    }
    return response;
  }

  async post(path, params, payload) {
    const url = `${path}/${params}`;
    const _response = await this.client({ method: 'POST', url, payload });
    const response = await _response.json();
    if (response.error) {
      throw new InstaError(response.error);
    }
    return response;
  }

  async update(path, params, payload) {
    const url = `${path}/${params}`;
    const _response = await this.client({
      method: 'PUT',
      url,
      payload
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
