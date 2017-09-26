import React from 'react';
import { compose, withStateHandlers } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow, OverlayView } from 'react-google-maps';
import PropTypes from 'prop-types';

import '../App.scss';

const style = {

}

const getPixelPositionOffset = (width, height) => ({
  x: -(width / 2),
  y: -(height / 2),
})

const Map = compose(
  withStateHandlers(() => ({
    count: 0,
  }), {
    onClick: ({ count }) => () => ({
      count: count + 1,
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
  <OverlayView
      position={{ lat: props.center.lat, lng: props.center.lng }}

      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}

      getPixelPositionOffset={getPixelPositionOffset}
    >
      <div style={{ width: '17px', height: '17px', borderRadius: '100%', background: `#4285F4`, border: `3px solid #fff`, boxShadow: '0px 0px 4px #282C34' }}></div>
    </OverlayView>
  </GoogleMap>
);

Map.propTypes = {
  defaultzoom: PropTypes.number,
  center: PropTypes.object,
  markers: PropTypes.array
};

export default Map;