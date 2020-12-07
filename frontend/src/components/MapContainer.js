import React, { Component } from 'react';
import env from "react-dotenv";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";


class MapContainer extends React.Component{
  render () {

    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
      <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: 37.368, lng: -121.961 }}
      >
        <Marker
          label='Clinic Connect'
          position={{ lat: 37.368, lng: -121.961 }}
        />
    
      </GoogleMap>
    ));

    return(
      <MapWithAMarker
      
      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
        process.env.REACT_APP_GOOGLE_KEY
      }`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      );
    }
}

export default MapContainer;