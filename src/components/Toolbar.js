import React from 'react';
import PropTypes from 'prop-types';

const Toolbar = ({ foodItems, sortPriceAsc, showFoodItems, handleToggleShowFoodItems, toggleSortPriceIcon}) => {
  return (
    <div className="toolbar">
    <div className="toolbar-left"></div>
      <p className="number-items">{foodItems.length} food items</p>
      <i onClick={handleToggleShowFoodItems} className={showFoodItems ? "fa fa-list" : "fa fa-map-o"} aria-hidden="true"></i>
      <div className="sort-by-price" onClick={toggleSortPriceIcon}>
        <p>Price</p>
        <i className={sortPriceAsc ? "fa fa-sort-numeric-asc" : "fa fa-sort-numeric-asc hide"} aria-hidden="true"></i>
        <i className={sortPriceAsc ? "fa fa-sort-numeric-desc hide" : "fa fa-sort-numeric-desc"} aria-hidden="true"></i>
      </div>
    </div>
  );
}

Toolbar.propTypes = {
  foodItems: PropTypes.array.isRequired,
  sortPriceAsc: PropTypes.bool.isRequired,
  toggleSortPriceIcon: PropTypes.func.isRequired
};

export default Toolbar;