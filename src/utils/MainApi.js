class MainApi {
  constructor(config) {
    this._url = config.url;
  }

  async _request(url, { method, body }) {
    const res = await fetch(`${this._url}${url}`, {
      method,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    try {
      const body = await res.json();
      return res.ok ? body : Promise.reject(new Error(body.message));
    } catch (_) {
      return Promise.reject(new Error('Ой, что-то пошло не так'));
    }
  }

  signup({ name, email, password }) {
    return this._request('/signup', {
      method: 'POST',
      body: { name, email, password },
    });
  }

  signin({ email, password }) {
    return this._request('/signin', {
      method: 'POST',
      body: { email, password },
    });
  }

  signout() {
    return this._request('/signout', { method: 'GET' });
  }

  getUser() {
    return this._request('/users/me', { method: 'GET' });
  }

  updateUser({ name, email }) {
    return this._request('/users/me', { method: 'PATCH', body: { name, email } });
  }

  getMovies() {
    return this._request('/movies', { method: 'GET' });
  }

  addMovie(data) {
    return this._request('/movies', { method: 'POST', body: data });
  }

  deleteMovie(id) {
    return this._request(`/movies/${id}`, { method: 'DELETE' });
  }
}

const mainApi = new MainApi({
  url: 'https://api.kanc1er-diploma.nomoredomainsicu.ru',
});

export default mainApi;
