import React from 'react';
import PropTypes from 'prop-types';

import './food-item.scss';

const FoodItem = ({ itemName }) => {
  return (
    <div className="food-item-container">{itemName}</div>
  );
};

FoodItem.propTypes = {
  itemName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
  description: PropTypes.string,
  contact: PropTypes.shape({
    formattedPhone: PropTypes.string,
    phone: PropTypes.string
  }).isRequired,
  location: PropTypes.shape({
    lat: PropTypes.string,
    lng: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
  }).isRequired
};

export default FoodItem;