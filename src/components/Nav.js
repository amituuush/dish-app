import React from 'react';
import PropTypes from 'prop-types';

const Nav = ({userInput, handleInputChange, handleInputSubmit, handleFocusOn, handleFocusOff}) => {
  return (
    <div className="app-header">
      <div className="logo-container">
        <h2>Dish</h2>
        <img className="app-logo" src="./img/plate-emoji.png" alt="dish-logo" />
        <div className="logo-alignment-helper"></div>
      </div>
      <div className="item-input-container">
        <i className="fa fa-search" aria-hidden="true"></i>
        <form>
          <input type="text"
            onChange={handleInputChange}
            value={userInput}
            placeholder="Search for any food item you can think of..."
            onFocus={handleFocusOn}
            onBlur={handleFocusOff}
          />
          <button type="submit" onClick={handleInputSubmit}>Search</button>
        </form>
      </div>
      <img className="avatar" src="./img/man.png" alt="avatar" />
      <div className="vertical-align-helper"></div>
    </div>
  );
}

Nav.propTypes = {
  userInput: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleInputSubmit: PropTypes.func.isRequired,
  handleFocusOn: PropTypes.func.isRequired,
  handleFocusOff: PropTypes.func.isRequired
};

export default Nav;