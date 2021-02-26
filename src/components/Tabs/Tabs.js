import React from 'react';
import './Tabs.css';
import PropTypes from 'prop-types';
import { remove_class } from '../../utitlity';

const Tabs = ({ ratedTab, searchTab, guest_session_id }) => {
  const tabs_titles = ['Search', 'Rated'];

  const toggle_tab = evt => {
    evt.preventDefault();
    const tab_value = evt.target.textContent;
    const item = evt.target;
    if (item.classList.contains('tabs__tab')) {
      remove_class('tabs__tab--active');
      item.classList.add('tabs__tab--active');
    }
    if (tab_value === 'Search') {
      searchTab();
    }
    if (tab_value === 'Rated') {
      ratedTab(guest_session_id);
    }
  };

  const tabs_list = tabs_titles.map((title, ind) => {
    if (ind === 0) {
      return (
        <button
          onClick={toggle_tab}
          className='tabs__tab tabs__tab--active'
          type='button'>
          {title}
        </button>
      );
    }
    return (
      <button onClick={toggle_tab} className='tabs__tab' type='button'>
        {title}
      </button>
    );
  });

  return <div className='tabs'>{tabs_list}</div>;
};

Tabs.propTypes = {
  ratedTab: PropTypes.bool.isRequired,
  searchTab: PropTypes.func.isRequired,
  guest_session_id: PropTypes.string.isRequired,
};

export default Tabs;
