import React from 'react';
import PropTypes from 'prop-types';

import '../styles/food-item.scss';

const FoodItem = ({ itemName, price, name, url, description, contact, location }) => {
  return (
    <div className="food-item-container">
      <h2 className="item-name">{itemName}</h2>
      <p className="price">{price}</p>
      <a href={url} target="_blank"><p>{name}</p></a>
      <p className="description">{description}</p>
    </div>
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
    lat: PropTypes.Number,
    lng: PropTypes.Number,
    address: PropTypes.string,
    city: PropTypes.string,
  }).isRequired
};

export default FoodItem;