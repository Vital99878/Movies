import React, { Component } from 'react';
import './Tabs.css';
import { rm_active_class, EventHandler } from '../../utitlity';

class Tabs extends Component {
  state = {
    search: '',
  };

  render() {
    const { search } = this.state;

    const toggle_tab = (event) => {
      const tabs = document.querySelector('.tabs');
      console.log(event.target);
    };

    return (
      <div className="tabs">
        <button onClick={toggle_tab} className="tabs__tab tabs__tab--active" type="button">
          Search
        </button>
        <button onClick={toggle_tab} className="tabs__tab" type="button">
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
