import React, { Component } from 'react';
import './MoviesList.css';
import PropTypes from 'prop-types';
import Movie from '../Movie/Movie';

const MoviesList = ({ movies_pages, page_number, genres_ids }) => {
  const movies = movies_pages[page_number].map((movie) => (
    <li key={movie.id}>
      <Movie {...movie} genres_ids={genres_ids} />
    </li>
  ));

  return <ul className="movie_page">{movies}</ul>;
};

MoviesList.defaultProp = {
  movies_pages: [],
  toggle_status: () => {},
  id: Math.random() * 784,
};
MoviesList.propTypes = {
  movies_pages: PropTypes.arrayOf.isRequired,
  page_number: PropTypes.number.isRequired,
  genres_ids: PropTypes.arrayOf.isRequired,
};

export default MoviesList;
