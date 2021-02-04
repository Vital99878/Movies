import React, { Component } from 'react';
import './App.css';




import MoviesList from '../MoviesList';
import Pagination from '../Pagination';
import Search from '../Search';
import Tabs from '../Tabs';

export default class App extends Component {
  state = {
    todo_list: [
      {
        label: 'Completed task',
        created: new Date(2021, 0, 25, 14, 55),
        id: 11,
        status: 'active',
      },
      {
        label: 'Editing task',
        created: new Date(2020, 11, 12, 14, 55),
        id: 52,
        status: 'active',
      },
      {
        label: 'Active task',
        created: new Date(2021, 0, 20, 10, 55),
        id: 3,
        status: 'active',
      },
    ],
    filter: 'all', // all, active, completed
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

  add_new_todo = (label) => {
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

  remove_todo = (id) => {
    this.setState(({ todo_list }) => ({
      todo_list: todo_list.filter((todo) => todo.id !== id),
    }));
  };

  toggle_filter = (filter) => {
    this.setState({ filter });
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
    const { todo_list, filter } = this.state;
    const visibleList = this.filter(todo_list, filter);

    return (
      <section className="app">
        <div>
          <Tabs />
          <Search toggle_filter={visibleList} />
        </div>
        <MoviesList list_arr={visibleList} toggle_status={this.toggle_status} remove_todo={this.remove_todo} />
        <Pagination toggle_filter={this.toggle_filter} />

      </section>
    );
  }
}
