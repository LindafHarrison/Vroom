import React from 'react';
import PropTypes from 'prop-types';

const search = (props) => {
  const { onTextChange, clicked } = props

  return (
    <div className="search" >
      <input className="input" type="text" name="search" placeholder='Search..'
        onKeyUp={event => onTextChange(event.target.value)} />
      <button className="button" onClick={event => {
        event.preventDefault()
        clicked()
      }}> Search </button>
    </div>
  )
}

export default search;