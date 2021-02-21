import { create_pages } from '../utitlity';
import mock from '../img/mock_img.png';

const base = 'https://api.themoviedb.org/3';
const key = '4a2f017c8cdb38c57478d603057ad10e';

class Movies_Service {
  transform_movies(movies) {
    return movies.map(
      ({ genre_ids, id, original_title, overview, poster_path, rating, release_date, vote_average }) => ({
        id,
        title: original_title,
        rate: vote_average,
        overview,
        poster_path: poster_path ? `https://image.tmdb.org/t/p/w185${poster_path}` : mock,
        release: release_date,
        genres: genre_ids,
        my_rating: rating,
      })
    );
  }

  async get_movies(search_text) {
    const response = await fetch(`${base}/search/movie?api_key=${key}&query=${search_text}`);
    if (!response.ok) {
      throw new Error(`Not working fetch ${base}/search/movie: ${response.status}`);
    }
    const body = await response.json();
    const movies = body.results;
    const updated_movies = this.transform_movies(movies);
    const quantity_movies = updated_movies.length;

    if (updated_movies.length === 0) {
      throw new Error('not found film');
    }
    return { movies_pages: create_pages(updated_movies, 6), quantity_movies };
  }

  async get_genres() {
    const response = await fetch(`${base}/genre/movie/list?api_key=${key}`);
    if (!response.ok) {
      throw new Error(`Not working fetch ${base}/search/movie: ${response.status}`);
    }
    const body = await response.json();
    return body.genres;
  }

  async get_guest_session_id() {
    const response = await fetch(`${base}/authentication/guest_session/new?api_key=${key}`);
    const body = await response.json();
    return body.guest_session_id;
  }

  async get_rated_movies(guest_session_id) {
    const response = await fetch(
      `${base}/guest_session/${guest_session_id}/rated/movies?api_key=${key}&sort_by=created_at.asc`
    );
    const body = await response.json();
    const movies = body.results;
    const updated_movies = this.transform_movies(movies);

    const quantity_movies = updated_movies.length;
    if (updated_movies.length === 0) {
      throw new Error('not found film');
    }
    return { movies_pages: create_pages(updated_movies, 6), quantity_movies };
  }

  async add_rate(guest_session_id, rate, movie_id) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({ value: rate });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    await fetch(`${base}/movie/${movie_id}/rating?api_key=${key}&guest_session_id=${guest_session_id}`, requestOptions);
  }
}

export default new Movies_Service();
