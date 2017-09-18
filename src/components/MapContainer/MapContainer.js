import React from 'react';
import { compose } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const MapContainer = compose(
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={props.defaultZoom}
    defaultCenter={props.center}
  >
    <Marker
      // position={{ lat: -34.397, lng: 150.644 }}
    />
  </GoogleMap>
);

export default MapContainer;