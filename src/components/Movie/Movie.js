import React from 'react';
import './Movie.css';
import PropTypes from 'prop-types';

function Movie({ title, poster_path,  id }) {
  return (
    <div className='card'>
      <label>
        <span className="description">{title}</span>
      </label>
      <img src={poster_path} alt="Poster" />
    </div>
  );
}

Movie.defaultProp = {
  label: '',
  created: 'ett',
  id: Math.random() * 784,
};
Movie.propTypes = {

  id: PropTypes.number.isRequired,
};
export default Movie;
