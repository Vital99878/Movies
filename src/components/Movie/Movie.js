import React from 'react';
import './Movie.css';
import PropTypes from 'prop-types';
import { Rate } from 'antd';
import 'antd/dist/antd.css';
import { truncate } from '../../utitlity';
import movie_service from '../Api';
// import mock_img from '../../img/заглушка.png'

// eslint-disable-next-line no-unused-vars
function Movie({ title, overview, genres, rate, poster_path, release, movie_data, id, my_rating }) {
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
  const { guest_session_id, genres_ids } = movie_data;
  

  const rating = (num) => {
    if (num <= 3) {
      num = '0-3'; // eslint-disable-line no-param-reassign
    }
    if (num > 3 && num <= 5) {
      num = '4-5'; // eslint-disable-line no-param-reassign
    }
    if (num > 5 && num <= 7) {
      num = '6-7'; // eslint-disable-line no-param-reassign
    }
    if (num > 7) {
      num = '8-10'; // eslint-disable-line no-param-reassign
    }
    return num;
  };

  const genres_names = genres
    .map((genre) => genres_ids.filter((item) => item.id === genre))
    .flat()
    .map((genre_obj) => genre_obj.name);

  const genres_list = genres_names.map((genre) => <div className="card__genre">{genre}</div>);

  const rate_style = { width: '280px', display: 'flex', justifyContent: 'space-around', marginBottom: '8px' };

  const release_date = (date) => {
    const month = monthNames[new Date(date).getMonth()];
    const year = new Date(date).getFullYear();
    const day_number = new Date(date).getDate();
    return `${month} ${day_number}, ${year}`;
  };

  const add_rate = (star) => {
    movie_service.add_rate(guest_session_id, star, id);
  };

  return (
    <li className="card" key={id}>
      <img className="card__poster" src={poster_path} alt="Poster" />
      <div className="card__title_rate">
        <p className="card__title">{title}</p>
        <div className={`card__rate--${rating(rate)}`}>{rate}</div>
      </div>
      <p className="card__release">{release_date(release)}</p>
      <div className="card__genres"> {genres_list}</div>
      <p className="card__overview">{truncate(overview, 190)}</p>
      <Rate allowHalf defaultValue={my_rating} count={10} style={rate_style} onChange={add_rate} />
    </li>
  );
}

Movie.defaultProp = {
  title: '',
  overview: 'ett',
};
Movie.propTypes = {
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.object).isRequired,
  rate: PropTypes.number.isRequired,
  poster_path: PropTypes.string.isRequired,
  release: PropTypes.isRequired,
  movie_data: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  genres_ids: PropTypes.arrayOf(PropTypes.object).isRequired,
  my_rating: PropTypes.number.isRequired,
};
export default Movie;
