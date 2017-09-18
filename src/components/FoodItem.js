import React from 'react';
import PropTypes from 'prop-types';

export const FoodItem = ({ itemName }) => {
  return (
    <div>{itemName}</div>
  );
};

FoodItem.propTypes = {
  itemName: PropTypes.string,
  id: PropTypes.string,
  price: PropTypes.string,
  name: PropTypes.string,
  url: PropTypes.string,
  description: PropTypes.string,
  contact: PropTypes.object,
  location: PropTypes.object
};