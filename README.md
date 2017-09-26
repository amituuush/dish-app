# Dish Application

## What does it do?
This app lets a user find the cheapest (or most expensive) food item of their searching. Simply enter a food item into the search bar, look through the list of options and/or find them on the map!

Check out the demo [here](https://amituuush.github.io/dish-app/)

<br />

## What did you build it with?
* Frontend built using React as a View layer, Webpack as a module bundler and SASS as a css-preprocessor
* HTML5 Geolocation API
* Foursquare API
* Google Maps API
* Axios - HTTP client

<br />

## How do I run it locally?
This repo uses yarn as a package manager. [Yarn can be installed using homebrew.](https://yarnpkg.com/en/docs/install)

1. Clone repo locally
2. Run `yarn install` to install all dependencies
3. Run `yarn start`
4. Navigate to [http://localhost:3000/](http://localhost:3000/)

<br />

## How does it work?

I initially use the HTML5 Geolocation API to get the user's location on the `<App />` component's componentDidMount lifecycle method. I then use the Foursquare API to fetch a list of restaurants. Once the response is received, I traverse through the data to extract the menu data along with some basic information about the restaurant and set this to the state (`this.state.menuData`). Once a user enters in a food item in the input, I search through all restaurant menus to check if their name or description contain the input value and set these food items on the state (`this.state.foodItems`) along with some basic information about the restaurant. `this.state.foodItems` is then passed as a `prop` to the `<Map />` component, which maps through each food item and renders a `<Marker />` for each.

<br />

## How could it be improved?

* Redux for state management
* ~~Handle user error form submit~~
* Show ratings for each restaurant
* Show distance from restaurant
* Sort by distance
* ~~Add responsiveness~~
* ~~Add zoom button to map~~
* Get directions to restaurant
* Save food items
* Expand search radius
* Display modal if geolocation api fails
* Unit tests