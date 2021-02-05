import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';

import { Pagination, Spin, Alert } from 'antd';
import MoviesList from '../MoviesList';
import Search from '../Search';
import Tabs from '../Tabs';
import Movies_Service from '../Api';

export default class App extends Component {
  movie_service = new Movies_Service();

  state = {
    movies_pages: false,
    page_number: 0,
    genres_ids: [],
    quantity_movies: 0,
    loading: true,
    error: false,
  };

  constructor(props) {
    super(props);
    this.getMovies();
    this.getGenres();
  }

  getMovies() {
    this.movie_service
      .get_movies('return')
      .then((movies) => {
        const { movies_pages, quantity_movies } = movies;
        this.setState({ movies_pages, quantity_movies, loading: false });
      })
      .catch(() => this.onError());
  }

  getGenres() {
    this.movie_service.get_genres().then((genres_ids) => {
      this.setState({ genres_ids });
    });
  }

  change_page_number = (page) => {
    this.setState({
      page_number: page - 1,
    });
  };

  onError = () => {
    this.setState({ error: true });
  };

  toggle_status = (id) => {
    const { todo_list } = this.state;
    const updated_todo_list = todo_list.map((todo) => {
      if (todo.id === id) {
        todo.status = todo.status === 'active' ? (todo.status = 'completed') : 'active';
      }
      return todo;
    });
    this.setState({ todo_list: updated_todo_list });
  };

  add_rate = (label) => {
    if (label.length >= 3) {
      this.setState(({ todo_list }) => {
        const new_todo = {
          label,
          created: Date.now(),
          id: Math.random() * 15875,
          status: 'active',
        };
        return {
          todo_list: [...todo_list, new_todo],
        };
      });
    }
  };

  filter = (items, filter) => {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => item.status === 'active');
      case 'completed':
        return items.filter((item) => item.status === 'completed');
      default:
        return items;
    }
  };

  render() {
    const { movies_pages, page_number, genres_ids, quantity_movies, loading, error } = this.state;
    const visibleList = '';

    if (loading) {
      return (
        <div className="spinner">
          <Spin size="large" />
        </div>
      );
    }

    if (error) {
      return (
        <div>
          <Alert
          message="Warning Text"
          description="Warning Description Warning Description Warning Description Warning Description"
          type="warning"
          />
        </div>
      );
    }

    return (
      <section className="app">
        <div>
          <Tabs />
          <Search toggle_filter={visibleList} />
        </div>
        <MoviesList movies_pages={movies_pages} page_number={page_number} genres_ids={genres_ids} />
        <Pagination current={page_number + 1} pageSize={6} onChange={this.change_page_number} total={quantity_movies} />
      </section>
    );
  }
}
