class MoviesApi {
    constructor(config) {
        this._url = config.url;
        this._movies = null;
    }

    async _fetchAll() {
        if (this._movies) {
            return;
        }

        const res = await fetch(`${this._url}/beatfilm-movies`, {method: 'GET'});
        if (!res.ok) {
            return Promise.reject(res.status);
        }

        this._movies = (await res.json()).map((movie) => ({
            _: {...movie, movieId: movie.id},
            id: movie.id,
            name: movie.nameRU,
            duration: movie.duration,
            trailerLink: movie.trailerLink,
            image: `https://api.nomoreparties.co${movie.image.url}`,
            thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
        }));
    }

    async search({text, short} = {}) {
        await this._fetchAll();

        let filtered = this._movies;

        if (text) {
            filtered = filtered.filter((x) => x.name.toLowerCase().includes(text.toLowerCase()));
        }

        if (short) {
            filtered = filtered.filter((x) => x.duration < 40);
        }

        return filtered;
    }
}

const moviesApi = new MoviesApi({url: 'https://api.nomoreparties.co'});

export default moviesApi;