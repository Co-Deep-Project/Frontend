import React, { useEffect } from "react";
import geojson from '../lib/data/map.json';

const SelectRegion = () => {
  useEffect(() => {
    // 카카오 맵 스크립트 로드
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=766e5495ed72a2cf85087b9422ddfdee&autoload=false`;
    script.async = true;

    // 스크립트 로드 완료 후 카카오 맵 초기화
    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('pollution-map');
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          level: 9,
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);
        const customOverlay = new window.kakao.maps.CustomOverlay({});
        const infowindow = new window.kakao.maps.InfoWindow({ removable: true });

        // GeoJSON 데이터를 기반으로 폴리곤 생성
        let polygons = [];

        geojson.features.forEach((feature) => {
          const coordinates = feature.geometry.coordinates[0];
          const name = feature.properties.name;

          const path = coordinates.map((coord) => new window.kakao.maps.LatLng(coord[1], coord[0]));

          const polygon = new window.kakao.maps.Polygon({
            map: map,
            path: path,
            strokeWeight: 2,
            strokeColor: '#004c80',
            strokeOpacity: 0.8,
            fillColor: '#fff',
            fillOpacity: 0.7,
          });

          polygons.push(polygon);

          // 구역에 마우스를 올렸을 때 이름 표시
          window.kakao.maps.event.addListener(polygon, 'mouseover', function (mouseEvent) {
            customOverlay.setContent(`<div style="padding:5px; color:black;">${name}</div>`);
            customOverlay.setPosition(mouseEvent.latLng);
            customOverlay.setMap(map);
          });

          // 마우스를 뗐을 때 이름 제거
          window.kakao.maps.event.addListener(polygon, 'mouseout', function () {
            customOverlay.setMap(null);
          });

          // 클릭 시 지역 이름 표시하는 인포윈도우
          window.kakao.maps.event.addListener(polygon, 'click', function (mouseEvent) {
            infowindow.setContent(`<div style="padding:5px; color:black;">${name}의 국회의원 조회</div>`);
            infowindow.setPosition(mouseEvent.latLng);
            infowindow.setMap(map);
          });
        });
      });
    };

    document.head.appendChild(script);
  }, []);

  return (
    <div>
      <h1>정치인 조회할 지역 선택</h1>
      <p>여기에서 조회하고 싶은 지역을 선택하세요.</p>
      <div id="pollution-map" style={{ width: '100%', height: '500px' }}></div> {/* 지도를 표시할 div */}
    </div>
  );
};

export default SelectRegion;
