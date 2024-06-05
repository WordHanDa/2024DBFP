import React, { useState, useEffect } from 'react';
import { LoadScript, GoogleMap } from '@react-google-maps/api';

const MapWithMarkerCluster = ({ selectedRows }) => {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 25.0718, lng: 121.591982 }); // Default center
  const [zoom, setZoom] = useState(14); // Default zoom level
  const markersRef = React.useRef([]);

  const geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK') {
          resolve(results[0].geometry.location);
        } else {
          reject(`Geocode was not successful for the following reason: ${status}`);
        }
      });
    });
  };

  useEffect(() => {
    if (selectedRows.length > 0) {
      selectedRows.forEach(row => {
        console.log(`Hospital Name: ${row.醫院名稱}, Address: ${row.醫院地址}`);
      });

      const firstRow = selectedRows[0];
      geocodeAddress(firstRow.醫院地址)
        .then(location => {
          setCenter({ lat: location.lat(), lng: location.lng() });
          setZoom(14); // Set zoom level
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      setCenter({ lat: 25.0718, lng: 121.591982 }); // Reset to default center
      setZoom(14); // Reset to default zoom
    }
  }, [selectedRows]);

  useEffect(() => {
    if (map) {
      // Clear existing markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      if (selectedRows.length > 0) {
        // Geocode addresses and create markers
        const newMarkersPromises = selectedRows.map(row => {
          return geocodeAddress(row.醫院地址)
            .then(location => {
              const marker = new window.google.maps.Marker({
                position: { lat: location.lat(), lng: location.lng() },
                map: map,
              });

              const infoWindow = new window.google.maps.InfoWindow({
                content: `<div><strong>${row.醫院名稱}</strong><br>Address: ${row.醫院地址}</div>`
              });

              marker.addListener('click', () => {
                infoWindow.open(map, marker);
              });

              return marker;
            })
            .catch(error => {
              console.error(`Geocode failed for address ${row.醫院地址}: ${error}`);
            });
        });

        Promise.all(newMarkersPromises).then(newMarkers => {
          markersRef.current = newMarkers.filter(marker => marker); // Filter out any undefined markers
        });
      }
    }
  }, [map, selectedRows]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyAFsDAifUDGbzyqqHhf5p415ZvHCPacJZY"> {/* Replace with your actual API key */}
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '600px' }}
        center={center}
        zoom={zoom}
        onLoad={(map) => setMap(map)}
      />
    </LoadScript>
  );
};

export default MapWithMarkerCluster;
