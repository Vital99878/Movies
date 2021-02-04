import React from 'react';
import './Movie.css';
import PropTypes from 'prop-types';

function Movie({ title, overview, genres, rate, poster_path, release, genres_ids }) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const genres_names = genres
    .map((genre) => genres_ids.filter((item) => item.id === genre))
    .flat()
    .map((genre_obj) => genre_obj.name);

  const genres_list = genres_names.map((genre) => <div className="card__genre">{genre}</div>);

  const release_date = (date) => {
    const month = monthNames[new Date(date).getMonth()];
    const year = new Date(date).getFullYear();
    const day_number = new Date(date).getDate();
    return `${month} ${day_number}, ${year}`;
  };
  const truncate_overview = (text) => `${text.slice(0, 180)} ...`;

  return (
    <div className="card">
      <img className="card__poster" src={poster_path} alt="Poster" />
      <div className="card__description">
        <p className="card__title">{title}</p>
        <picture className="card__rate">{rate}</picture>
        <p className="card__release">{release_date(release)}</p>
        <div className="card__genres"> {genres_list}</div>
        <p className="card__overview">{truncate_overview(overview)}</p>
        <p className="card__stars">{rate}</p>
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
