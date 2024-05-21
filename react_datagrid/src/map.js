/* global google */
import React, { useEffect, useState } from 'react';
import './map.css';

const MapBody = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    // Callback function to set the script loaded state
    window.initMap = () => {
      setIsScriptLoaded(true);
    };

    // Load the Google Maps script
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAFsDAifUDGbzyqqHhf5p415ZvHCPacJZY&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    };

    loadScript();
  }, []);

  useEffect(() => {
    if (isScriptLoaded) {
      var Station_latlng = { lat: 25.0718, lng: 121.591982 }; // 台北車站的經緯度
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14, //放大的倍率
        center: Station_latlng //初始化的地圖中心位置
      });

      //--------下面是呼叫一個新marker------

      var marker = new google.maps.Marker({
        position: Station_latlng, //marker的放置位置
        map: map //這邊的map指的是第四行的map變數
      });
    }
  }, [isScriptLoaded]);

  return <div id="map" style={{ width: '100%', height: '100vh' }}></div>;
};

export default MapBody;
