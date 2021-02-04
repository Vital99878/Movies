import React            from 'react';
import './Movie.css';
import PropTypes        from 'prop-types';
import { Rate }         from 'antd';
import 'antd/dist/antd.css';
import num_round_half, {truncate_update} from '../../utitlity'


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

  const rate_style = { width: '280px', display: 'flex', justifyContent: 'space-around', marginBottom: '8px' };

  const release_date = (date) => {
    const month = monthNames[new Date(date).getMonth()];
    const year = new Date(date).getFullYear();
    const day_number = new Date(date).getDate();
    return `${month} ${day_number}, ${year}`;
  };



  return (
    <div className="card">
      <img className="card__poster" src={poster_path} alt="Poster" />
      <div className="card__description">
        <div className="card__title_rate">
          <p className="card__title">{title}</p>
          <picture className="card__rate">{rate}</picture>
        </div>
        <p className="card__release">{release_date(release)}</p>
        <div className="card__genres"> {genres_list}</div>
        <p className="card__overview">{truncate_update(overview, 235)}</p>
        <Rate allowHalf defaultValue={num_round_half(rate)} count={10} style={rate_style} />
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
