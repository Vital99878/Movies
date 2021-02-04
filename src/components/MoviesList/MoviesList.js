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
  }

  getMovies() {
    this.movie_service.get_movies('return').then((movies) => {
      this.setState({ list_arr: movies.splice(0,6) });
    });
  }

  render() {
    const { toggle_status, remove_todo } = this.props;
    const { list_arr } = this.state;

    if (!list_arr) {
      return <div>No data</div>;
    }

    const task_list = list_arr.map((todo) => (
      <li key={todo.id}>
        <Movie {...todo} toggle_status={toggle_status} remove_todo={remove_todo} />
      </li>
    ));

    return (
        <ul className="movie_page">{task_list}</ul>
    );
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
