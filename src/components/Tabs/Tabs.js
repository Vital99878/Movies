import React, { Component } from 'react';
import './Tabs.css';
import PropTypes from 'prop-types';
import { rm_class } from '../../utitlity';

export default class Tabs extends Component {
  state = {
    // eslint-disable-next-line react/no-unused-state
    search: '',
  };

  componentDidMount() {
    const tabs = document.querySelector('.tabs');
    tabs.addEventListener('click', this.toggle_t);
  }

  toggle_t(evt) {
    evt.preventDefault();
    const item = evt.target;

    if (item.classList.contains('tabs__tab')) {
      rm_class('tabs__tab--active', 'tabs__tab');
      item.classList.add('tabs__tab--active');
    }
  }

  render() {
    const { ratedTab, searchTab, guest_session_id } = this.props;

    return (
      <div className="tabs">
        <button onClick={searchTab} className="tabs__tab tabs__tab--active" type="button">
          Search
        </button>
        <button onClick={() => ratedTab(guest_session_id)} className="tabs__tab" type="button">
          Rated
        </button>
      </div>
    );
  }
}

Tabs.propTypes = {
  ratedTab: PropTypes.bool.isRequired,
  searchTab: PropTypes.func.isRequired,
  guest_session_id: PropTypes.string.isRequired,
};
