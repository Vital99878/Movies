import React, { Component } from 'react';
import './Tabs.css';
import { rm_active_class, EventHandler } from '../../utitlity';


class Tabs extends Component {
  state = {
    search: '',
  };



  componentDidMount() {
    const tabs = document.querySelector('.tabs');
    tabs.addEventListener('click', this.toggle_t)
  }

  toggle_t (evt){
    evt.preventDefault();
    const item = evt.target;

    if (item.classList.contains('tabs__tab')) {
      rm_active_class ('tabs__tab--active', 'tabs__tab')
      item.classList.add ('tabs__tab--active')
    }
  }

  render() {
    const { search } = this.state;
    const { ratedTab,searchTab, guest_session_id, } = this.props;

    const toggle_active = (evt) => {
      const current_tab = evt.target;
      if (!current_tab.classList.contains('tabs__tab--active') ) {
        current_tab.classList.add('tabs__tab--active')
      }
    };

    const toggle_rated = () => {
      console.log(guest_session_id);
      // getRatedMovies(guest_session_id);
    };



    return (
      <div className="tabs">
        <button onClick={searchTab} className="tabs__tab tabs__tab--active" type="button">
          Search
        </button>
        <button  onClick={ratedTab} className="tabs__tab" type="button">
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
