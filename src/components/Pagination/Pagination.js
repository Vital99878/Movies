import React from 'react';
import './Pagination.css';
import PropTypes  from 'prop-types';
import TaskFilter from '../Search/Search';

const Pagination = ( { toggle_filter, filter, clear_completed, active_todos_count }) => (
  <footer className="footer">
    <span className="todo-count">{active_todos_count} items left</span>
    <TaskFilter toggle_filter={toggle_filter} filter={filter} />
    <button onClick={clear_completed} className="clear-completed" type="button">
      Clear completed
    </button>
  </footer>
);

Pagination.propTypes = {
  clear_completed: PropTypes.func.isRequired,
  toggle_filter: PropTypes.func.isRequired,
};

Pagination.defaultProp = {
  filter: 'all',
};

export default Pagination;
