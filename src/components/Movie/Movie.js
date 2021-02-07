import React                               from 'react';
import './Movie.css';
import PropTypes                           from 'prop-types';
import { Rate }                            from 'antd';
import 'antd/dist/antd.css';
import num_round_half, { truncate_update } from '../../utitlity';
import Movies_Service                      from '../Api';

function Movie({ title, overview, genres, rate, poster_path, release, movie_data, id }) {
  const movie_service = new Movies_Service();
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
  const {guest_session_id, genres_ids} = movie_data;

  const rating = (num) => {
    if (num <= 3) {
      num = '0-3';
    }
    if (num > 3 && num <= 5) {
      num = '4-5';
    }
    if (num > 5 && num <= 7) {
      num = '6-7';
    }
    if (num > 7) {
      num = '8-10';
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
    movie_service.add_rate(guest_session_id, star, id).then(res => console.log(res))
  }

  return (
    <div className="card">
      <img className="card__poster" src={poster_path} alt="Poster" />
      <div className="card__description">
        <div className="card__title_rate">
          <p className="card__title">{title}</p>
          <picture className={`card__rate--${rating(rate)}`}>{rate}</picture>
        </div>
        <p className="card__release">{release_date(release)}</p>
        <div className="card__genres"> {genres_list}</div>
        <p className="card__overview">{truncate_update(overview, 220)}</p>
        <Rate allowHalf defaultValue={0} count={10} style={rate_style} onChange={add_rate}/>
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
  genres_ids: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default Movie;
