import React from 'react';
import { compose, withProps, withStateHandlers } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import PropTypes from 'prop-types';


const Map = compose(
  withStateHandlers(() => ({
    isOpen: false,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={props.defaultZoom}
    defaultCenter={props.center} >

  {
    props.markers.map((marker, index) => {
      const { lat, lng } = marker.location;
      const markerCenter = { lat, lng };
      const { itemName, name } = marker;
      return (
        <Marker
          key={index}
          position={markerCenter}
          onClick={props.onToggleOpen} >
          {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}>
          <div>{itemName}, {name}</div>
          </InfoWindow>}
        </Marker>
      );
    })
  }
    
  </GoogleMap>
);

export default Map;

Map.propTypes = {
  defaultzoom: PropTypes.number,
  center: PropTypes.object,
  markers: PropTypes.array
};