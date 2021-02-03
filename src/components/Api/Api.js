import React from 'react';
import './Api.css';

const api_key = '4a2f017c8cdb38c57478d603057ad10e';
const url = 'https://api.themoviedb.org/3/search/movie/';

export default class Movies_Service {
  async get_movies(search_text) {
    const response = await fetch(`${url}?api_key=${api_key}&query=${search_text}`);
    if (!response.ok) {
      throw new Error(`Not working fetch ${url}: ${response.status}`);
    }
    const body = await response.json();
    const movies = body.results;
    return movies.map((movie) => ({
      id: movie.id,
      title: movie.original_title,
      rate: movie.vote_average,
      overview: movie.overview,
      poster_path: `https://image.tmdb.org/t/p/w185/${movie.poster_path}`,
      release: `movie[ "release_date" ]`,
    }));
  }
}
