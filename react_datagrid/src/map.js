import React, { useState, useEffect } from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';

const MapWithMarkerCluster = ({ selectedRows }) => {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 25.0718, lng: 121.591982 }); // Default center
  const [zoom, setZoom] = useState(14); // Default zoom level
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    console.log("Selected Rows:");
    selectedRows.forEach(row => {
      console.log(`Latitude: ${row.緯度}, Longitude: ${row.經度}`);
    });

    if (selectedRows.length > 0) {
      const firstRow = selectedRows[0];
      setCenter({ lat: parseFloat(firstRow.緯度), lng: parseFloat(firstRow.經度) });
      setZoom(14);
    }
  }, [selectedRows]);

  useEffect(() => {
    if (map) {
      // Clear existing markers
      markers.forEach(marker => marker.setMap(null));
      
      // Create new markers
      const newMarkers = selectedRows.map(row => {
        const marker = new window.google.maps.Marker({
          position: { lat: parseFloat(row.緯度), lng: parseFloat(row.經度) },
          map: map,
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div><strong>${row.醫療院所名稱}</strong><br>經度: ${row.經度}, 緯度: ${row.緯度}</div>`
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        return marker;
      });

      setMarkers(newMarkers);
    }
  }, [map, selectedRows]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyAFsDAifUDGbzyqqHhf5p415ZvHCPacJZY">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={center}
        zoom={zoom}
        onLoad={(map) => setMap(map)}
      />
    </LoadScript>
  );
};

export default MapWithMarkerCluster;
