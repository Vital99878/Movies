import React, { Component } from 'react';
import './Search.css';
import debounce from 'lodash.debounce';
import * as PropTypes from 'prop-types';
// import  PropTypes  from 'prop-types'

class Search extends Component {

  state = {
    search: '',
  };

  render()  {
    const { search } = this.state;
    const { get_search_text } = this.props;

    let onSearch = (evt) => {
      const search_data = evt.target.value;
       get_search_text(search_data)
      this.setState({search: search_data})
    };
    onSearch = debounce(onSearch, 500);

    return <input className="search" placeholder="Type to search..." onKeyUp={onSearch}/>;
  }
}

// Search.propTypes = { get_search_text: PropTypes.any };

// Search.defaultProps = {
//   filter: 'all',
// };
//
// Search.propTypes = {
//   get_search_text: PropTypes.func.isRequired,
// };

export default Search;
