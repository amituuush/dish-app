import React from 'react';
import PropTypes from 'prop-types';

const Nav = ({userInput, handleInputChange, handleInputSubmit, handleInputClear, handleFocusOn, handleFocusOff, menuData}) => {

  let input;
  if (menuData.length > 0) {
    input = (
      <div className="item-input-container">
        <form>
          <i className="fa fa-search" aria-hidden="true"></i>
            <input type="text"
              onChange={handleInputChange}
              value={userInput}
              placeholder="Search for food prices near you (e.g. burrito)"
              onFocus={handleFocusOn}
              onBlur={handleFocusOff}
            />
            <i onClick={handleInputClear} className={userInput === "" ? "" : "fa fa-times-circle"} aria-hidden="true"></i>
            <button type="submit" onClick={handleInputSubmit}>Search</button>
            <div className="vertical-align-helper"></div>
          </form>
      </div>
    )
  } else {
    input = (
      <div className="item-input-container">
        <i className="fa fa-cog fa-spin fa-2x fa-fw"></i>
        <p>Counting 0's and 1's...</p>
        <div className="vertical-align-helper"></div>
      </div>
    )
  }

  return (
    <div className="app-header">
      <div className="logo-container">
        <h2>Dish</h2>
        <img className="app-logo" src="./img/plate-emoji.png" alt="dish-logo" />
        <div className="logo-alignment-helper"></div>
      </div>
      {input}
      <img className="avatar" src="./img/man.png" alt="avatar" />
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