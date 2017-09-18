import React from 'react';
import { compose } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import PropTypes from 'prop-types';


const Map = compose(
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={props.defaultZoom}
    defaultCenter={props.center}
  >

  {
    props.markers.map((marker, index) => {
      const { lat, lng } = marker.location;
      const markerCenter = { lat, lng };
      return (
        <Marker
          key={index}
          position={markerCenter}
        />
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