import React, { useEffect, useRef, useState } from "react";
import { Map, TileLayer, Marker, Popup, FeatureGroup } from "react-leaflet";
import { removeEmptyObjFromArrayObj } from "../../../../utils/functions/functions";
import { MAPBOX_ACCESS_TOKEN, MAPBOX_URL } from "../../../../settings/mapbox";
import "leaflet/dist/leaflet.css";
const L = require("leaflet");

function doCleanData(data) {
  let cleanData = data.filter(function (item) {
    return item != null;
  });
  cleanData = removeEmptyObjFromArrayObj(cleanData);
  return cleanData;
}

export default ({ mapStyle, data }) => {
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    });
  }, []);

  const [refreshComponent, setRefreshComponent] = useState(true);

  useEffect(() => {
    // refresh component to cause map to center properly
    setRefreshComponent(false);
  }, [setRefreshComponent]);

  const mapRef = useRef(null);
  const groupRef = useRef(null);

  const cleanData = doCleanData(data);

  useEffect(() => {
    if (
      cleanData.length === 0 ||
      cleanData.length === 1 ||
      !mapRef.current ||
      !groupRef.current
    ) {
      return;
    }

    const map = mapRef.current.leafletElement;
    const group = groupRef.current.leafletElement;

    map.fitBounds(group.getBounds());
  }, [cleanData]);

  return cleanData.length !== 0 ? (
    <>
      <h2 style={{ margin: "30px 0 10px 0" }}>Map Preview</h2>
      <Map
        center={[cleanData[0].latitude, cleanData[0].longitude]}
        zoom={13}
        style={mapStyle}
        ref={mapRef}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url={`${MAPBOX_URL}${MAPBOX_ACCESS_TOKEN}`}
          // url={`https://api.mapbox.com/styles/v1/hackneygis/ck7ounc2t0cg41imjb3j53dp8/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_ACCESS_TOKEN}`}
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
  ) : null;
};
