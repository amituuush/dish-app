import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid';
import { config } from './config';

import Nav from './components/Nav';
import Toolbar from './components/Toolbar';
import FoodItem from './components/FoodItem';
import Map from './components/Map';

import './App.css';
import 'normalize.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userCoords: {
        lat: '',
        lng: ''
      },
      userInput: '',
      menuData: [],
      foodItems: [],
      focus: false,
      sortPriceAsc: true,
      searchError: false,
      showFoodItems: true
    };

    this.fetchNearbyRestaurants = this.fetchNearbyRestaurants.bind(this);
    this.getUserLocation = this.getUserLocation.bind(this);
    this.searchMenus = this.searchMenus.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
    this.handleFocusOn = this.handleFocusOn.bind(this);
    this.handleFocusOff = this.handleFocusOff.bind(this);
    this.toggleSortPriceIcon = this.toggleSortPriceIcon.bind(this);
    this.sortAscFoodItems = this.sortAscFoodItems.bind(this);
    this.sortDescFoodItems = this.sortDescFoodItems.bind(this);
    this.handleMarkerOpen = this.handleMarkerOpen.bind(this);
    this.handleMarkerClose = this.handleMarkerClose.bind(this);
    this.handleInputClear = this.handleInputClear.bind(this);
    this.handleToggleShowFoodItems = this.handleToggleShowFoodItems.bind(this);
  }

  componentDidMount() {
    this.getUserLocation();
  }

  // use HTML5 Geolocation API to get user location
  getUserLocation() {
    const self = this;
    const success = (pos) => {
      self.setState({ userCoords: { lat: pos.coords.latitude, lng: pos.coords.longitude} });
    };

    function error(err) { console.warn(`ERROR(${err.code}): ${err.message}`); };
    navigator.geolocation.getCurrentPosition(success, error);
  }

  componentDidUpdate(prevProps, prevState) {
    // fetch nearby restaurants as soon as user location is received
    (prevState.userCoords.lat === '' && this.state.userCoords.lat)
    ? this.fetchNearbyRestaurants() : '';

    // call handleInputSubmit after batch of menu data has been returned (fetchMenus)
    (prevState.menuData.length === 19 && this.state.menuData.length === 20 && this.state.userInput)
    ? this.handleInputSubmit() : '';
  }

  // use Foursquare API to fetch all restaurants nearby after user location has been set to state
  fetchNearbyRestaurants() {
    const self = this;
    const { lat, lng } = this.state.userCoords;

    // move to config?
    const fsRestUrl = `https://api.foursquare.com/v2/venues/search?categoryId=4d4b7105d754a06374d81259&ll=${lat},${lng}&client_id=${config.CLIENT_ID}&client_secret=${config.CLIENT_SECRET}&radius=2000&intent=browse&limit=50&v=20170101`;

    axios.get(fsRestUrl)
      .then((res) => { self.fetchMenus(res); })
      .catch((err) => { console.log(err); });
  }

  // of all restaurants fetched that have a menu, combine each restaurant's menu data and basic info to object and concat to state.menuData
  fetchMenus(res) {
    const self = this;

    // move to config?
    function fsMenuUrl(venueId) {
      return `https://api.foursquare.com/v2/venues/${venueId}/menu?client_id=${config.CLIENT_ID}&client_secret=${config.CLIENT_SECRET}&v=20170101`;
    }

    res.data.response.venues.forEach(venue => {
      const { id, menu, name, location, contact, url, hereNow } = venue;
      if (menu) {
        axios.get(fsMenuUrl(id))
          .then((res) => {
            const menuData = res.data.response.menu.menus;
            self.setState((prevState, props) => ({
              menuData: [...prevState.menuData, {...menuData, id, name, location, contact, url, hereNow}]
            }));
          })
          .catch((err) => { console.log(err); });
      }
    });
  }

  // search each menu for food item based on user input
  searchMenus() {
    let foodItems = [];
    this.state.menuData.forEach(merchant => {
      if (merchant.count) {
        merchant.items.forEach(menu => {
          if (menu.entries.count) {
            menu.entries.items.forEach(section => {
              if (section.entries.count) {
                section.entries.items.forEach(item => {
                  const itemName = item.name.toLowerCase();
                  const { price, description } = item;
                  if (price && itemName.includes(this.state.userInput)) {
                    const { name, location, contact, url, hereNow } = merchant;
                    foodItems = [...foodItems,
                      { itemName, price, description, name, location, contact, url, hereNow, isOpen: false, id: uuid() }
                    ];
    }})}})}})}})

    if (foodItems.length === 0) { this.setState({ searchError: true }); }
    else { this.setState({ searchError: false }); }

    this.sortAscFoodItems(foodItems);
  }

  sortAscFoodItems(foodItems) {
    foodItems.sort((a, b, radix) => parseInt(a.price, radix) - parseInt(b.price, radix) );
    this.setState({ foodItems: foodItems});
  }

  sortDescFoodItems() {
    let foodItems = this.state.foodItems;
    foodItems.sort((a, b, radix) => parseInt(b.price, radix) - parseInt(a.price, radix) );
    this.setState({ foodItems: foodItems });
  }

  toggleSortPriceIcon() {
    this.state.sortPriceAsc ? this.sortDescFoodItems() : this.sortAscFoodItems(this.state.foodItems);
    this.setState({ sortPriceAsc: !this.state.sortPriceAsc });
  }

  handleMarkerOpen(id) {
    const resetMarkers = this.state.foodItems.map(item => {
      item.isOpen = false;
      return item;
    });
    const foodItems = resetMarkers.map(foodItem => {
      if (foodItem.id === id) { foodItem.isOpen = true; }
      return foodItem;
    });
    this.setState({ foodItems: foodItems });
  }

  handleMarkerClose(id) {
    const resetMarkers = this.state.foodItems.map(item => {
      item.isOpen = false;
      return item;
    });
    this.setState({ foodItems: resetMarkers });
  }

  handleInputSubmit(event) {
    if (event) { event.preventDefault(); }
    this.setState({ foodItems: [], focus: false });
    if (this.state.userInput) { this.searchMenus(); }
  }

  handleInputChange(event) {
    this.setState({ userInput: event.target.value });
  }

  handleInputClear() {
    this.setState({ userInput: '' });
  }

  handleFocusOn() {
    this.setState({ focus: true });;
  }

  handleFocusOff() {
    this.setState({ focus: false });
  }

  handleToggleShowFoodItems() {
    this.setState({ showFoodItems: !this.state.showFoodItems });
  }

  render() {
    let foodItems;
    if (this.state.foodItems.length) {
      foodItems = this.state.foodItems.map((foodItem, index) => {
        return ( <FoodItem {...foodItem} key={index} handleMarkerOpen={this.handleMarkerOpen} showFoodItems={this.state.showFoodItems} /> );
      });
    } else if (this.state.searchError) {
      foodItems = (
        <div className="food-item-placeholder-error">
          <i className="fa fa-meh-o fa-3x" aria-hidden="true"></i>
          <p>Oops! We can't find that in your area.</p>
        </div>
      );
    } else {
      foodItems = (
        <div className="food-item-placeholder">
          <i className="fa fa-arrow-up fa-3x" aria-hidden="true"></i>
          <p>Search above!</p>
        </div>
      );
    }

    const { lat, lng } = this.state.userCoords;
    let map;
    if (this.state.userCoords.lat) {
      map = <Map
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDbAapEiCeohDYppdjBjve_BZ8M3B5mO9c&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100vh` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        center={{ lat, lng }}
        defaultZoom={12}
        handleMarkerOpen={this.handleMarkerOpen}
        handleMarkerClose={this.handleMarkerClose}
        markers={this.state.foodItems}
      />;
    } else {
      map = (
        <div className="location-waiting">
          <i className="fa fa-cog fa-spin fa-3x fa-fw"></i>
          <p>Warming up pixels...</p>
        </div>
      );
    }

    return (
      <div className="app">
        <Nav
          userInput={this.state.userInput}
          handleInputChange={this.handleInputChange}
          handleInputSubmit={this.handleInputSubmit}
          handleInputClear={this.handleInputClear}
          handleFocusOn={this.handleFocusOn}
          handleFocusOff={this.handleFocusOff}
          menuData={this.state.menuData}
        />
        <div className={this.state.focus ? "fade list-map-container" : "list-map-container"}>
          <Toolbar
            foodItems={this.state.foodItems}
            sortPriceAsc={this.state.sortPriceAsc}
            showFoodItems={this.state.showFoodItems}
            handleToggleShowFoodItems={this.handleToggleShowFoodItems}
            toggleSortPriceIcon={this.toggleSortPriceIcon}
          />
          <div className={this.state.showFoodItems ? "list-container-hide" : "list-container"}>{foodItems}</div>
          <div className={this.state.showFoodItems ? "map-container" : "map-container-hide"}>
            {map}
          </div>
        </div>
      </div>
    );
  }
}
