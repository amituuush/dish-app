import React, { Component } from 'react';
import axios from 'axios';
import { config } from './config.js';

import FoodItem from './components/FoodItem';
import Map from './components/Map';

import './App.css';
import 'normalize.css';

var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
// const googleUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=34.1820822,-118.7839273&radius=3200&type=restaurant&key=AIzaSyBq0ImMlJHsFIWZ0fKsoLQYOHhXwDbGiKU';

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
      foodItems: []
    };

    this.fetchNearbyRestaurants = this.fetchNearbyRestaurants.bind(this);
    this.getUserLocation = this.getUserLocation.bind(this);
    this.searchMenus = this.searchMenus.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
  } 

  componentDidMount() {
    this.getUserLocation();
  }

  // use HTML5 Geolocation API to get user location
  getUserLocation() {
    const self = this;
    function success(pos) {
      self.setState({
        userCoords: {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        },
      });
      self.fetchNearbyRestaurants();
    };
    
    function error(err) {
      console.log('location error');
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };
    navigator.geolocation.getCurrentPosition(success, error);
  }

  // use Foursquare API to fetch all restaurants nearby after user location has been retrieved
  fetchNearbyRestaurants() {
    const self = this;
    const { lat, lng } = this.state.userCoords;

    // move to config?
    const fsRestUrl = `https://api.foursquare.com/v2/venues/search?categoryId=4d4b7105d754a06374d81259&ll=${lat},${lng}&client_id=${config.CLIENT_ID}&client_secret=${config.CLIENT_SECRET}&v=20170101`;

    axios.get(proxyUrl + fsRestUrl)
      .then(function(res) {
        self.fetchMenus(res);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  // of all restaurants fetched that have a menu, combine each restaurant's menu data and basic info to object and concat to state.menuData
  fetchMenus(res) {
    const self = this;

    function fsMenuUrl(venueId) {
      return `https://api.foursquare.com/v2/venues/${venueId}/menu?client_id=${config.CLIENT_ID}&client_secret=${config.CLIENT_SECRET}&v=20170101`;
    }

    res.data.response.venues.forEach(venue => {
      const { id, menu, name, location, contact, url } = venue;
      if (menu) {
        axios.get(proxyUrl + fsMenuUrl(id))
          .then(function(res) {
            const menuData = res.data.response.menu.menus;
            self.setState((prevState, props) => ({
              menuData: [...prevState.menuData, {...menuData, id, name, location, contact, url}]
            }));
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    });
  }

  // search each menu for user input
  searchMenus(userInput) {
    const self = this;

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
                    const { id, name, location, contact, url } = merchant;
                    self.setState((prevState, props) => ({
                      foodItems: [...prevState.foodItems, {itemName, price, description, id, name, location, contact, url}]
                    }));
                  }
                })
              }
            })
          }
        })
      }
    })
  }

  handleInputSubmit(event) {
    event.preventDefault();
    this.searchMenus();
  }

  handleInputChange(event) {
    this.setState({ userInput: event.target.value });
  }

  render() {
    const foodItems = this.state.foodItems.map((foodItem, index) => {
      return ( <FoodItem {...foodItem} key={index} /> );
    });

    const { lat, lng } = this.state.userCoords;
    let map;
    if (this.state.userCoords.lat) {
      map = <Map
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDbAapEiCeohDYppdjBjve_BZ8M3B5mO9c&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        center={{lat, lng}}
        defaultZoom={9}
        markers={this.state.foodItems}
      />;
    } else {
      map = <div>Waiting to receive your current location...</div>;
    }

    return (
      <div className="App">
        <div className="App-header">
          <h2>Dish</h2>
        </div>
        <div className="list-map-container">
          <form>
            <input type="text" onChange={this.handleInputChange} value={this.state.userInput} />
            <button type="submit" onClick={this.handleInputSubmit}>Search</button>
          </form>
          <div className="list-container hide">
          {foodItems}
          </div>
          <div className="map-container">
            {map}
          </div>
        </div>
      </div>
    );
  }
}
