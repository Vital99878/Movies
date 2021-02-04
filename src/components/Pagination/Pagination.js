import React from 'react';
import './Pagination.css';
import PropTypes from 'prop-types';
import TaskFilter from '../Search/Search';

const Pagination = () => <div className="pagination">Pagination</div>;

Pagination.propTypes = {};

Pagination.defaultProp = {
  filter: 'all',
};

export default Pagination;
