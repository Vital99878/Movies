import React from 'react';
import './Api.css';
import { create_pages } from '../../utitlity';

const api_key = '4a2f017c8cdb38c57478d603057ad10e';
const url = 'https://api.themoviedb.org/3/search/movie/';
const url_genre = 'https://api.themoviedb.org/3/genre/movie/list';

export default class Movies_Service {
  async get_movies(search_text) {
    const response = await fetch(`${url}?api_key=${api_key}&query=${search_text}`);
    if (!response.ok) {
      throw new Error(`Not working fetch ${url}: ${response.status}`);
    }
    const body = await response.json();
    const movies = body.results;
    const updated_movies = movies.map((movie) => ({
      id: movie.id,
      title: movie.original_title,
      rate: movie.vote_average,
      overview: movie.overview,
      poster_path: `https://image.tmdb.org/t/p/w185/${movie.poster_path}`,
      release: movie.release_date,
      genres: movie.genre_ids,
    }));
    const quantity_movies = updated_movies.length;
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
}
