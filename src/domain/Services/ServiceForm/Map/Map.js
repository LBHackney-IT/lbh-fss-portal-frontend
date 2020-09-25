// import React from "react";
// import { render } from "react-dom";
// import { Map, Marker, Popup, TileLayer } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import "react-leaflet/dist/react-leaflet.css";

// const position = [51.505, -0.09];
// const HackneyMap = () => {
//   return (
//     <Map center={position} zoom={13}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <Marker position={position}>
//         <Popup>
//           A pretty CSS3 popup.
//           <br />
//           Easily customizable.
//         </Popup>
//       </Marker>
//     </Map>
//   );
// };

// export default HackneyMap;

import React, { useEffect, useRef } from "react";
import { Map, TileLayer, Marker, Popup, FeatureGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
const L = require("leaflet");

export default ({ mapStyle, data }) => {
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });
  }, []);

  const avgLatitude =
    data.reduce((total, next) => total + parseFloat(next.latitude), 0) /
    data.length;

  const avgLongitude =
    data.reduce((total, next) => total + parseFloat(next.longitude), 0) /
    data.length;

  const mapRef = useRef(null);
  const groupRef = useRef(null);

  //   function handleClick() {
  //     const map = mapRef.current.leafletElement;
  //     const group = groupRef.current.leafletElement;
  //     map.fitBounds(group.getBounds());
  //   }

  useEffect(() => {
    if (data.length === 1) return;
    const map = mapRef.current.leafletElement;
    const group = groupRef.current.leafletElement;
    map.fitBounds(group.getBounds());
  }, [data]);

  return (
    <>
      <button
      //   onClick={handleClick}
      >
        Zoom
      </button>
      <Map
        center={[avgLatitude, avgLongitude]}
        // center={[1, 2]}
        zoom={13}
        style={mapStyle}
        ref={mapRef}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FeatureGroup ref={groupRef}>
          {data.map((address, index) => {
            return (
              <Marker
                position={[
                  parseFloat(address.latitude),
                  parseFloat(address.longitude),
                ]}
                key={index}
              >
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            );
          })}
        </FeatureGroup>
      </Map>
    </>
  );
};
