import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';

import { Pagination, Spin, Alert } from 'antd';
import MoviesList                  from '../MoviesList';
import Search                      from '../Search';
import Tabs                        from '../Tabs';
import Movies_Service              from '../Api';


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
  };

  componentDidMount() {
    this.getMovies( 'return' );
    this.getGenres();
  }

  componentDidUpdate( prevProps, prevState, snapshot ) {
    const { search } = this.state;
    if ( search !== prevState.search ) {
      this.getMovies( search );
    }
  }

  getMovies( movie ) {
    this.movie_service
        .get_movies( movie )
        .then( ( movies ) => {
          const { movies_pages, quantity_movies } = movies;
          this.setState( { movies_pages, quantity_movies, loading: false, error: false } );
        } )
        .catch( () => this.onError() );
  }

  getGenres() {
    this.movie_service
        .get_genres()
        .then( ( genres_ids ) => {
          this.setState( { genres_ids } );
        } )
        .catch( () => this.onError() );
  }

  change_page_number = ( page ) => {
    this.setState( {
                     page_number: page - 1,
                   } );
  };

  onError = () => {
    this.setState( { loading: false, error: true } );
  };

  add_rate = ( label ) => {
    if ( label.length >= 3 ) {
      this.setState( ( { todo_list } ) => {
        const new_todo = {
          label,
          created: Date.now(),
          id: Math.random() * 15875,
          status: 'active',
        };
        return {
          todo_list: [ ...todo_list, new_todo ],
        };
      } );
    }
  };

  get_search_text = ( text ) => {
    this.setState( { search: text, loading: true } );
  };

  render() {
    const { movies_pages, page_number, genres_ids, quantity_movies, loading, error, search } = this.state;

    if ( loading ) {
      return (
        <div className="spinner">
          <Spin size="large" />
        </div>
      );
    }

    return (
      <section className="app">
        <div>
          <Tabs />
          <Search search={search} get_search_text={this.get_search_text} />
        </div>
        {error ? (
          <Alert message="There are no movies with this name" description="Try search another movie" type="warning" />
        ) : (
          <MoviesList movies_pages={movies_pages} page_number={page_number} genres_ids={genres_ids} />
        )}
        { error || (
          <Pagination
            current={page_number + 1}
            pageSize={6}
            onChange={this.change_page_number}
            total={quantity_movies}
          />
        )}
      </section>
    );
  }
}
