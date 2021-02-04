import React from 'react';
import './Movie.css';
import PropTypes from 'prop-types';

function Movie({ title, overview, genres, rate, poster_path, add_rate, release }) {
  const genres_list = () => {
    genres.map((genre) => (<div className="card__genre">{genre}</div>));
  };
  console.log(genres)

  const truncate_overview = (text) => `${text.slice(0, 180 )} ...`;

  return (
    <div className="card">
      <img className="card__poster" src={poster_path} alt="Poster" />
      <div className="card__description">
        <p className="card__title">{title}</p>
        <picture className="card__rate">{rate}</picture>
        <p className="card__release">{release}</p>
        <div className="card__genres">{genres.map((genre) => (<div className="card__genre">{genre}</div>))}</div>
        <p className="card__overview">{truncate_overview(overview)}</p>
      </div>
    </div>
  );
}

Movie.defaultProp = {
  label: '',
  created: 'ett',
  id: Math.random() * 784,
};
Movie.propTypes = {
  //  id: PropTypes.number.isRequired,
};
export default Movie;
