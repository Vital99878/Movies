import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
  state = {
    search: '',
  };

  onSearch(evt) {
    console.log(evt.target.value);
  }

  render() {
    const { search } = this.state;

    return <input className="search" placeholder="Type to search..." onChange={this.onSearch} />;
  }
}

// Search.defaultProps = {
//   filter: 'all',
// };
//
// Search.propTypes = {
//   filter: PropTypes.oneOf(['all', 'active', 'completed']),
//   toggle_filter: PropTypes.func.isRequired,
// };

export default Search;
