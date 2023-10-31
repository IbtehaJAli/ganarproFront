// src/components/Map.js
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "70%",
  height: "100vh",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function Map({ locations, fetchLocations }) {
  return (
    <div style={{ display: "flex" }}>
      <LoadScript googleMapsApiKey="AIzaSyBC249Xttk78q_uoRl27ZkKVSsf0zWItwY">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onBoundsChanged={(map) => {
            const bounds = map.getBounds();
            const ne = bounds.getNorthEast();
            const sw = bounds.getSouthWest();
            fetchLocations(ne, sw);
          }}
        >
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={{
                lat: parseFloat(location.latitude),
                lng: parseFloat(location.longitude),
              }}
              label={location.name}
            />
          ))}
        </GoogleMap>
      </LoadScript>
      {/*<div style={{ width: "30%", overflowY: "scroll" }}>*/}
      {/*  {locations.map((location, index) => (*/}
      {/*    <div*/}
      {/*      key={index}*/}
      {/*      style={{ padding: "10px", borderBottom: "1px solid #ccc" }}*/}
      {/*    >*/}
      {/*      <h2>{location.name}</h2>*/}
      {/*      /!* Render other location details here *!/*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</div>*/}
    </div>
  );
}

export default Map;
