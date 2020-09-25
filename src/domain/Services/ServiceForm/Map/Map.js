import React, { useEffect, useRef } from "react";
import { Map, TileLayer, Marker, Popup, FeatureGroup } from "react-leaflet";
import { removeEmptyObjFromArrayObj } from "../../../../utils/functions/functions";
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

  const cleanData = removeEmptyObjFromArrayObj(data);

  const avgLatitude =
    cleanData.reduce((total, next) => total + parseFloat(next.latitude), 0) /
    cleanData.length;

  const avgLongitude =
    cleanData.reduce((total, next) => total + parseFloat(next.longitude), 0) /
    cleanData.length;

  const mapRef = useRef(null);
  const groupRef = useRef(null);

  // TODO: autozoom/center works if using the click button but not so well within the useEffect
  // note - i want it to work in the useEffect
  function handleClick() {
    const map = mapRef.current.leafletElement;
    const group = groupRef.current.leafletElement;
    map.fitBounds(group.getBounds());
  }

  useEffect(() => {
    // console.log("cleanData");
    // console.log(cleanData);
    // console.log(cleanData.length === 1);
    if (cleanData.length === 1) return;

    const map = mapRef.current.leafletElement;
    const group = groupRef.current.leafletElement;
    map.fitBounds(group.getBounds());
  }, [cleanData]);

  return (
    <>
      <button onClick={handleClick}>Zoom</button>
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
          {cleanData.map((address, index) => {
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
