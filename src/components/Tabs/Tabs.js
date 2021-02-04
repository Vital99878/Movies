import React, { Component } from 'react';
import './Tabs.css';

class Tabs extends Component {
  state = {
    search: '',
  };

  render() {
    const { search } = this.state;

    return (
      <div className="tabs">
        <button className="tabs__tab" type="button">
          Search
        </button>
        <button className="tabs__tab--active" type="button">
          Rated
        </button>
      </div>
    );
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

export default Tabs;
