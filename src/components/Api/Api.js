import './Api.css';
import { create_pages } from '../../utitlity';

const api_key = '4a2f017c8cdb38c57478d603057ad10e';
const url = 'https://api.themoviedb.org/3/search/movie/';
const url_genre = 'https://api.themoviedb.org/3/genre/movie/list';
const url_guest = 'https://api.themoviedb.org/3/authentication/guest_session/new';
const url_rated = 'https://api.themoviedb.org/3/guest_session';
const url_post_rate = 'https://api.themoviedb.org/3/movie';

export default class Movies_Service {
  _transform_movies(movies) {

    return movies.map((movie) => ({
      id: movie.id,
      title: movie.original_title,
      rate: movie.vote_average,
      overview: movie.overview,
      poster_path: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
      release: movie.release_date,
      genres: movie.genre_ids,
    }));
  }

  async get_movies(search_text) {
    const response = await fetch(`${url}?api_key=${api_key}&query=${search_text}`);
    if (!response.ok) {
      throw new Error(`Not working fetch ${url}: ${response.status}`);
    }
    const body = await response.json();
    const movies = body.results;
    const updated_movies = this._transform_movies(movies);
    const quantity_movies = updated_movies.length;
    if (updated_movies.length === 0) {
      throw new Error('not found film');
    }
    return { movies_pages: create_pages(updated_movies, 6), quantity_movies };
  }

  async get_genres() {
    const response = await fetch(`${url_genre}?api_key=${api_key}`);
    if (!response.ok) {
      throw new Error(`Not working fetch ${url}: ${response.status}`);
    }
    const body = await response.json();
    return body.genres;
  }

  async get_guest_session_id() {
    const response = await fetch(`${url_guest}?api_key=${api_key}`);
    const body = await response.json();
    return body.guest_session_id;
  }

  async get_rated_movies(guest_session_id) {
    const response = await fetch(
      `${url_rated}/${guest_session_id}/rated/movies?api_key=${api_key}&sort_by=created_at.asc`
    );
    const body = await response.json();
    const movies = body.results;
    const updated_movies = this._transform_movies(movies);

    const quantity_movies = updated_movies.length;
    if (updated_movies.length === 0) {
      throw new Error('not found film');
    }
    return { movies_pages: create_pages(updated_movies, 6), quantity_movies };
  }

  async add_rate(guest_session_id, rate, movie_id) {
    const body = { value: rate };
    console.log(JSON.stringify(body))
    fetch(`${url_post_rate}/${movie_id}/rating$?api_key=${api_key}&guest_session_id=${guest_session_id}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    }).then(res => console.log(res));
  }
}

// post rate https://api.themoviedb.org/3/movie/708336/rating?api_key=4a2f017c8cdb38c57478d603057ad10e&guest_session_id=adcb9deb8c86b7e9cd76a678e5fc67a6

// get rated https://api.themoviedb.org/3/guest_session/5f184e4c665396cb66484b17624c8955/rated/movies?api_key=4a2f017c8cdb38c57478d603057ad10e&sort_by=created_at.asc
