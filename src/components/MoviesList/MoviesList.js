import React, { Component } from 'react';
import './MoviesList.css';
import PropTypes from 'prop-types';
import Movie from '../Movie/Movie';
import Movies_Service from '../Api/Api';

export default class MoviesList extends Component {
  movie_service = new Movies_Service();

  state = {
    list_arr: false,
  };

  constructor(props) {
    super(props);
    this.getMovies();
    this.getGenres();
  }

  getMovies() {
    this.movie_service.get_movies('return').then((movies) => {
      this.setState({ list_arr: movies.splice(0, 6) });
    });
  }

  getGenres() {
    this.movie_service.get_genres().then((genres_ids) => {
      this.setState({ genres_ids });
    });
  }

  render() {
    const { add_rate } = this.props;
    const { list_arr, genres_ids } = this.state;

    if (!list_arr || !genres_ids) {
      return <div>No data</div>;
    }

    const movies = list_arr.map((movie) => (
      <li key={movie.id}>
        <Movie {...movie} add_rate={add_rate} genres_ids={genres_ids}/>
      </li>
    ));

    return <ul className="movie_page">{movies}</ul>;
  }
}

MoviesList.defaultProp = {
  list_arr: [],
  toggle_status: () => {},
  id: Math.random() * 784,
};
MoviesList.propTypes = {
  remove_todo: PropTypes.func.isRequired,
  list_arr: PropTypes.arrayOf.isRequired,
  toggle_status: PropTypes.string.isRequired,
};
