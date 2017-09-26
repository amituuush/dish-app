import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FoodItem extends Component {
  constructor(props) {
    super(props);

    this.state = { toolTipShow: false };

    this.toggleToolTipShow = this.toggleToolTipShow.bind(this);
  }

  toggleToolTipShow() {
    this.setState({ toolTipShow: !this.state.toolTipShow });
  }

  render() {
    const { itemName, price, url, name, id, hereNow, handleMarkerOpen } = this.props;
    let { description } = this.props;
    if (description && description.length > 30) {
      description = description.substring(0, 30) + '...';
    }
    return (
      <div className="food-item-container" onClick={() => handleMarkerOpen(id)}>
        <h2 className="item-name">{itemName}</h2>
        <p className="price">${price}</p>
        <div className="venue-name-container">
          <a href={url} target="_blank"><p>{name}</p></a>
          <p className="here-now" onMouseEnter={this.toggleToolTipShow} onMouseLeave={this.toggleToolTipShow}>
            <i className="fa fa-users" aria-hidden="true"></i>{hereNow ? hereNow.count : 0}
          </p>
          <div className="tool-tip-container">
          <span className={this.state.toolTipShow ? "tool-tip show-visibility" : "tool-tip"}>
            Number of people currently checked in at restaurant
          </span>
          </div>
        </div>
        <p className="description">{description}</p>
      </div>
    );
  }
}

FoodItem.propTypes = {
  itemName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
  description: PropTypes.string,
  hereNow: PropTypes.shape({
    count: PropTypes.number
  }),
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