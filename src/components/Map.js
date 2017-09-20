import React from 'react';
import { compose } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import PropTypes from 'prop-types';

import '../App.scss';

const Map = compose(
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
      const { itemName, name, price, id, isOpen, url } = marker;
      return (
        <Marker
          key={index}
          position={markerCenter}
          onClick={() => props.handleMarkerOpen(id)} >
          { isOpen ?
            <InfoWindow onCloseClick={() => props.handleMarkerClose(id)}>
              <div className="info-window-gm">
                <h3>{itemName}</h3>
                <p className="info-window-price">${price}</p>
                <a href={url} target="_blank"><p>{name}</p></a>
              </div>
            </InfoWindow>
            : ''
          }
        </Marker>
      );
    })
  }
  </GoogleMap>
);

Map.propTypes = {
  defaultzoom: PropTypes.number,
  center: PropTypes.object,
  markers: PropTypes.array
};

export default Map;