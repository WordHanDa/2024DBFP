import React, { useState, useEffect } from 'react';
import { LoadScript, GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api';

const MapWithMarkerCluster = ({ selectedRows }) => {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState({ lat: 25.0718, lng: 121.591982 }); // Default center
  const [zoom, setZoom] = useState(14); // Default zoom level
  const [userLocation, setUserLocation] = useState(null);
  const [directions, setDirections] = useState(null);
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

  const reverseGeocode = (lat, lng) => {
    const geocoder = new window.google.maps.Geocoder();
    const latlng = { lat: lat, lng: lng };
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          const addressComponents = results[0].address_components;
          let city = '';
          let street = '';

          addressComponents.forEach(component => {
            if (component.types.includes('administrative_area_level_1')) {
              city = component.long_name;
            }
            if (component.types.includes('administrative_area_level_2')) {
              street = component.long_name;
            }
          });

          console.log(`User location: ${city}, ${street}`);
        } else {
          console.log('No results found');
        }
      } else {
        console.log(`Geocoder failed due to: ${status}`);
      }
    });
  };

  const handleUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(userPosition);
        setCenter(userPosition);
        setZoom(14);
        reverseGeocode(userPosition.lat, userPosition.lng);
      },
      (error) => {
        console.error(`Error getting location: ${error.message}`);
        alert('請允許存取使用者位置功能');
      }
    );
  };

  const getDirections = (origin, destination) => {
    const directionsService = new window.google.maps.DirectionsService();
    const request = {
      origin: origin,
      destination: destination,
      travelMode: window.google.maps.TravelMode.WALKING,
    };
    
    directionsService.route(request, (response, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        setDirections(response);
      } else {
        console.error(`Directions request failed due to ${status}`);
      }
    });
  };

  useEffect(() => {
    handleUserLocation();
  }, []);

  useEffect(() => {
    if (selectedRows.length > 0 && userLocation) {
      const firstRow = selectedRows[0];
      geocodeAddress(firstRow.醫院地址)
        .then(location => {
          setCenter({ lat: location.lat(), lng: location.lng() });
          setZoom(14); // Set zoom level
          getDirections(userLocation, { lat: location.lat(), lng: location.lng() });
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [selectedRows, userLocation]);

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
      >
        {userLocation && (
          <Marker 
            position={userLocation} 
            title="Your Location"
          />
        )}
        {directions && (
          <DirectionsRenderer
            directions={directions}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapWithMarkerCluster;
