import React, { Component } from 'react';
import './Search.css';
import debounce from 'lodash.debounce';
// import  PropTypes  from 'prop-types'

const Search = ({ get_search_text }) => {
  let onSearch = (evt) => {
    const search_data = evt.target.value;
    get_search_text(search_data);
  };
  onSearch = debounce(onSearch, 500);

  return <input className="search" placeholder="Type to search..." onChange={onSearch} />;
};

// Search.defaultProps = {
//   filter: 'all',
// };
//
// Search.propTypes = {
//   get_search_text: PropTypes.func.isRequired,
// };

export default Search;
