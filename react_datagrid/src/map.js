/* global google */
import React, { useEffect, useRef } from 'react';
import './map.css';

const MapBody = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadScript = (url, callback) => {
      const existingScript = document.querySelector(`script[src="${url}"]`);
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          console.log('Script loaded successfully');
          callback();
        };
        script.onerror = (error) => {
          console.error('Error loading script:', error);
        };
        document.head.appendChild(script);
      } else {
        existingScript.onload = callback;
      }
    };

    const initMap = () => {
      if (!mapRef.current) {
        console.error('Map container element not found');
        return;
      }

      const Station_latlng = { lat: 25.0718, lng: 121.591982 }; // 台北車站的經緯度
      const map = new google.maps.Map(mapRef.current, {
        zoom: 14, // 放大的倍率
        center: Station_latlng, // 初始化的地圖中心位置
      });

      // 呼叫一個新 marker
      new google.maps.Marker({
        position: Station_latlng, // marker 的放置位置
        map: map, // 這邊的 map 指的是第四行的 map 變數
      });
    };

    const API_KEY = 'AIzaSyAFsDAifUDGbzyqqHhf5p415ZvHCPacJZY';
    window.initMap = initMap; // Define initMap on the window object

    loadScript(`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`, () => {
      if (window.google) {
        window.initMap();
      } else {
        console.error('Google Maps API failed to load.');
      }
    });

    // Cleanup function to remove the script when the component is unmounted
    return () => {
      const script = document.querySelector(`script[src="https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap"]`);
      if (script) {
        document.head.removeChild(script);
      }
      // Remove the initMap function from the window object
      delete window.initMap;
    };
  }, []);

  return (
    <div className="map-container">
      <div ref={mapRef} id="map" className="map"></div>
    </div>
  );
};

export default MapBody;
