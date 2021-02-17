import React, { useEffect } from 'react';
import './Tabs.css';
import PropTypes from 'prop-types';
import { rm_class } from '../../utitlity';

const Tabs = ({ ratedTab, searchTab, guest_session_id }) => {
  const toggle_tab = (evt) => {
    evt.preventDefault();
    const item = evt.target;
    if (item.classList.contains('tabs__tab')) {
      rm_class('tabs__tab--active');
      item.classList.add('tabs__tab--active');
    }
  };

  useEffect(() => {
    const tabs = document.querySelector('.tabs');
    tabs.addEventListener('click', toggle_tab);
  });

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
};

Tabs.propTypes = {
  ratedTab: PropTypes.bool.isRequired,
  searchTab: PropTypes.func.isRequired,
  guest_session_id: PropTypes.string.isRequired,
};

export default Tabs;
