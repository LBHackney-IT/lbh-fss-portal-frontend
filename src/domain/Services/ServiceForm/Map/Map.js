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

  const mapRef = useRef(null);
  const groupRef = useRef(null);

  useEffect(() => {
    if (cleanData.length === 1) return;

    const map = mapRef.current.leafletElement;
    const group = groupRef.current.leafletElement;

    map.fitBounds(group.getBounds());
  }, [cleanData]);

  return (
    <>
      <Map
        center={[cleanData[0].latitude, cleanData[0].longitude]}
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
              ></Marker>
            );
          })}
        </FeatureGroup>
      </Map>
    </>
  );
};
