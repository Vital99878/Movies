import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';

import { Pagination, Spin, Alert } from 'antd';
import MoviesList from '../MoviesList';
import Search from '../Search';
import Tabs from '../Tabs';
import Movies_Service from '../Api';
import { Provider } from '../genres-context/genres-context';

export default class App extends Component {
  movie_service = new Movies_Service();

  state = {
    movies_pages: null,
    page_number: 0,
    genres_ids: [],
    quantity_movies: 0,
    loading: true,
    error: false,
    search: 'return',
    guest_session_id: null,
    show_search: true,
  };

  componentDidMount() {
    this.getMovies('return');
    this.getGenres();
    const { guest_session_id } = this.state;
    if (!guest_session_id) {
      this.createGuestSessionId();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { search } = this.state;
    if (search !== prevState.search) {
      this.getMovies(search);
    }
  }

  getMovies(movie) {
    this.movie_service
      .get_movies(movie)
      .then((movies) => {
        const { movies_pages, quantity_movies } = movies;
        this.setState({ movies_pages, quantity_movies, loading: false, error: false });
      })
      .catch(() => this.onError());
  }

  getGenres() {
    this.movie_service
      .get_genres()
      .then((genres_ids) => {
        this.setState({ genres_ids });
      })
      .catch(() => this.onError());
  }

  ratedTab = (guest_session_id) => {
    this.setState({ show_search: false });
    this.movie_service
      .get_rated_movies(guest_session_id)
      .then((movies) => {
        const { movies_pages, quantity_movies } = movies;
        this.setState({
          movies_pages,
          quantity_movies,
          page_number: 0,
          loading: false,
          error: false,
          show_search: false,
        });
      })
      .catch(() => this.onError());
  };

  searchTab = () => {
    this.setState({ show_search: true });
    this.getMovies('return');
  };

  addRate = (guest_session_id, rate) => {
    this.movie_service.add_rate(guest_session_id, rate);
  };

  change_page_number = (page) => {
    this.setState({
      page_number: page - 1,
    });
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  get_search_text = (text) => {
    this.setState({ search: text, loading: true });
  };

  createGuestSessionId() {
    this.movie_service
      .get_guest_session_id()
      .then((guest_session_id) => {
        this.setState({ guest_session_id });
      })
      .catch(() => this.onError());
  }

  render() {
    const {
      movies_pages,
      page_number,
      genres_ids,
      quantity_movies,
      loading,
      error,
      search,
      guest_session_id,
      show_search,
    } = this.state;

    if (loading) {
      return (
        <div className="spinner">
          <Spin size="large" />
        </div>
      );
    }
    const movie_data = { guest_session_id, genres_ids };

    return (
      <section className="app">
        <Provider value={movie_data}>
          <div>
            <Tabs ratedTab={this.ratedTab} searchTab={this.searchTab} guest_session_id={guest_session_id} />
            {show_search ? <Search search={search} get_search_text={this.get_search_text} /> : null}
          </div>
          {error ? (
            <Alert message="There are no movies with this name" description="Try search another movie" type="warning" />
          ) : (
            <MoviesList movies_pages={movies_pages} page_number={page_number}/>
          )}
          {error || (
            <Pagination
              current={page_number + 1}
              pageSize={6}
              onChange={this.change_page_number}
              total={quantity_movies}
            />
          )}
        </Provider>
      </section>
    );
  }
}
