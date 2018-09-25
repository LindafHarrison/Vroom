import React from 'react';
import PropTypes from 'prop-types';

const manufacturers = (props) => {
  const { select, manufacturer } = props;
  return (
    <div className="manufacturer"
      onClick={event => select(event.target.textContent)} >
      {manufacturer}
    </div>
  )
}

export default manufacturers;
