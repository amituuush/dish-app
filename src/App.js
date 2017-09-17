import React, { Component } from 'react';
import axios from 'axios';
import { config } from './config.js';
import logo from './logo.svg';
import './App.css';

var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const googleUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=34.1820822,-118.7839273&radius=3200&type=restaurant&key=AIzaSyBq0ImMlJHsFIWZ0fKsoLQYOHhXwDbGiKU';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userCoords: {
        lat: '',
        lon: ''
      },
      userInput: '',
      menuData: []
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
      // pass in function instead of object?
      self.setState({
        userCoords: {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        },
      });
      self.fetchNearbyRestaurants();
    };
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };
    
    navigator.geolocation.getCurrentPosition(success, error);
  }

  // use Foursquare API to fetch all restaurants nearby after user location has been retrieved
  fetchNearbyRestaurants() {
    const self = this;
    const {lat, lon} = this.state.userCoords;

    // move to config?
    const fsRestUrl = `https://api.foursquare.com/v2/venues/search?categoryId=4d4b7105d754a06374d81259&ll=${lat},${lon}&client_id=${config.CLIENT_ID}&client_secret=${config.CLIENT_SECRET}&v=20170101`;

    axios.get(proxyUrl + fsRestUrl)
      .then(function (res) {
        self.fetchMenus(res);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  fetchMenus(res) {
    const self = this;

    function fsMenuUrl(venueId) {
      return `https://api.foursquare.com/v2/venues/${venueId}/menu?client_id=${config.CLIENT_ID}&client_secret=${config.CLIENT_SECRET}&v=20170101`;
    }

    res.data.response.venues.forEach(venue => {
      const {id, menu, name, location, contact, url} = venue;
      if (menu) {
        axios.get(proxyUrl + fsMenuUrl(id))
          .then(function (res) {
            const menuData = res.data.response.menu.menus;
            self.setState((prevState, props) => ({
              menuData: [...prevState.menuData, {...menuData, id, name, location, contact, url}]
            }));
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });

  }

  searchMenus(userInput) {
    this.state.menuData.map(merchant => {
      if (merchant.count) {
        merchant.items.map(menu => {
          if (menu.entries.count) {
            menu.entries.items.map(section => {
              if (section.entries.count) {
                section.entries.items.map(item => {
                  const itemName = item.name.toLowerCase();
                  const price = item.price
                  if (itemName.includes(this.state.userInput)) {
                    console.log(merchant);
                    console.log(itemName, price); 
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
    console.log(this.state.userInput);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Dish</h2>
        </div>
        <form>
          <input type="text" onChange={this.handleInputChange} value={this.state.userInput} />
          <button type="submit" onClick={this.handleInputSubmit}>Search</button>
        </form>
      </div>
    );
  }
}

export default App;
