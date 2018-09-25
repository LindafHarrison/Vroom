import React from 'react';
import PropTypes from 'prop-types';

const manufacturerDetails = (props) => {
    const { display, closeModal, lastCarClicked, addresses } = props;
    const dealershipAddress = addresses ? addresses.map((dealership, i) => (
        <li key={i}> {dealership} </li>
    )) : "waiting for addresses to load.."
    return (
        <div className="popUp" style={{ display: display }}>
            <div className="manufacturersDetails">
                <div className="modalHeader">
                    <span className="close" onClick={event => closeModal()}>
                        &times;
            </span>
                    <h2> {lastCarClicked} car's available at the following locations: </h2>
                </div>
                <ul>
                    {dealershipAddress}
                </ul>
            </div>
        </div>
    )
}

export default manufacturerDetails;
