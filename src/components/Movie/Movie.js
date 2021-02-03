import React from 'react';
import './Movie.css';
import PropTypes from 'prop-types';

function Movie({ title, poster_path, remove_todo, status, id }) {
  return (
    <div className={`view ${status}`}>
      <label>
        <span className="description">{title}</span>
      </label>
      <img src={poster_path} alt="Poster" />
      <button className="icon icon-edit" type="button" aria-label="Edit" />
      <button aria-label="Delete" type="button" className="icon icon-destroy" onClick={() => remove_todo(id)} />
    </div>
  );
}

Movie.defaultProp = {
  label: '',
  created: 'ett',
  status: '',
  id: Math.random() * 784,
};
Movie.propTypes = {
  remove_todo: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
export default Movie;
