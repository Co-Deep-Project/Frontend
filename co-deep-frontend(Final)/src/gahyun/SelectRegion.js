import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import geojson from '../lib/data/map.json';
import './SelectRegion.css'; 

const SelectRegion = () => {
    const navigate = useNavigate();

  useEffect(() => {
    // 카카오 맵 스크립트 로드
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=766e5495ed72a2cf85087b9422ddfdee&autoload=false`;
    script.async = true;

    // 스크립트 로드 완료 후 카카오 맵 초기화
    script.onload = () => {
      window.kakao.maps.load(() => {
        // 지도가 표시될 html 요소
        const mapContainer = document.getElementById('politic-map');
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          level: 9, // 지도의 확대 레벨
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);
        const customOverlay = new window.kakao.maps.CustomOverlay({});
        // 구역 클릭 시 해당 구역의 정보 표시하는 정보창 생성
        const infowindow = new window.kakao.maps.InfoWindow({ removable: true });

        let polygons = [];

        // 폴리곤을 표시하는 함수 정의
        const displayArea = (coordinates, name) => {
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
            polygon.setOptions({
                fillColor : '#cfc2e9'
            });
            customOverlay.setContent(`<div style="padding:5px; color:black;">${name}</div>`);
            customOverlay.setPosition(mouseEvent.latLng);
            customOverlay.setMap(map);
          });

          // 마우스를 뗐을 때 이름 제거
          window.kakao.maps.event.addListener(polygon, 'mouseout', function () {
            polygon.setOptions({ fillColor: '#fff' });
            customOverlay.setMap(null);
          });

          // 클릭 시 지역 이름 표시하는 인포윈도우
          window.kakao.maps.event.addListener(polygon, 'click', function (mouseEvent) {
            const content = `
                <div class="infowindow-content">
                    <p><b>${name}</b>의 정치인 조회</p>
                    <div class="infowindow-button-container">
                        <button class="infowindow-button" onclick="window.location.href='/politician-list'">구청장 조회</button>
                        <button class="infowindow-button" onclick="window.location.href='/area-details'">국회의원 조회</button>
                    </div>
                </div>`;

            infowindow.setContent(content);
            infowindow.setPosition(mouseEvent.latLng);
            infowindow.setMap(map);
          });
        };

        // GeoJSON 데이터를 기반으로 각 구역 폴리곤을 지도에 표시
        geojson.features.forEach((feature) => {
          const coordinates = feature.geometry.coordinates[0];
          const name = feature.properties.SIG_KOR_NM;
          displayArea(coordinates, name); // displayArea 함수 호출 -> 지도에 표시됨
        });
      });
    };

    document.head.appendChild(script);
  }, []);

  return (
    <div className="container">
      <header className="header">
        <img src="/images/logo.png" alt="PoliTracker" className="logo" />
        <button className="home-button" onClick={() => navigate("/")}>Home</button>
      </header>

      <div className="textbox">
        <h1>우리 지역 정치인 트래킹하기</h1>
        <p>아래 지도에서 조회하고 싶은 지역을 선택하세요.</p>
      </div>
      <div id="politic-map"></div> 

      <footer className="footer">
        <p>성균관대학교 트래커스꾸<br />서울특별시 종로구 성균관로 25-2<br />trackerskku@g.skku.edu</p>
      </footer>
    </div>
  );
};

export default SelectRegion;