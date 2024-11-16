import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import geojson from "../lib/data/seoul_map.json";
import districtsJson from "../lib/data/seoul_districts.json"; // 동 정보가 포함된 JSON 파일
import "./SelectRegion.css";

// 폴리곤의 중심 좌표 계산 함수
function calculatePolygonCenter(path) {
    let xSum = 0;
    let ySum = 0;
    const count = path.length;

    path.forEach((latLng) => {
        xSum += latLng.getLng();
        ySum += latLng.getLat();
    });

    const centerLng = xSum / count;
    const centerLat = ySum / count;

    return new window.kakao.maps.LatLng(centerLat, centerLng);
}

const SelectRegion = () => {
    const navigate = useNavigate();
    const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;

    useEffect(() => {
        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&autoload=false`;
        script.async = true;

        script.onload = () => {
            window.kakao.maps.load(() => {
                const mapContainer = document.getElementById("politic-map");
                const mapOption = {
                    center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
                    level: 9, // 지도의 확대 레벨
                };

                const map = new window.kakao.maps.Map(mapContainer, mapOption);
                const customOverlay = new window.kakao.maps.CustomOverlay({});
                const infowindow = new window.kakao.maps.InfoWindow({ removable: true });

                let regionPolygons = []; // 구 폴리곤 저장
                let dongPolygons = []; // 동 폴리곤 저장

                // 동 폴리곤 표시 함수
                const displayDongAreas = (dongData) => {
                    dongData.forEach((dong) => {
                        const geometryType = dong.geometry.type;

                        if (geometryType === "Polygon") {
                            const path = dong.geometry.coordinates[0].map(
                                (coord) => new window.kakao.maps.LatLng(coord[1], coord[0])
                            );

                            const polygon = new window.kakao.maps.Polygon({
                                map: map,
                                path: path,
                                strokeWeight: 2,
                                strokeColor: "#5C5B5C", // 동 테두리색깔
                                strokeOpacity: 0.8,
                                fillColor: "#CACACB", // 동 안에 색칠
                                fillOpacity: 0.7,
                            });

                            dongPolygons.push(polygon);
                            addDongPolygonEvents(polygon, dong);
                        } else if (geometryType === "MultiPolygon") {
                            dong.geometry.coordinates.forEach((polygonCoords) => {
                                const path = polygonCoords[0].map(
                                    (coord) => new window.kakao.maps.LatLng(coord[1], coord[0])
                                );

                                const polygon = new window.kakao.maps.Polygon({
                                    map: map,
                                    path: path,
                                    strokeWeight: 2,
                                    strokeColor: "#5C5B5C",
                                    strokeOpacity: 0.8,
                                    fillColor: "#CACACB",
                                    fillOpacity: 0.7,
                                });

                                dongPolygons.push(polygon);
                                addDongPolygonEvents(polygon, dong);
                            });
                        }
                    });
                };

                // 동 폴리곤 이벤트 추가 함수
                const addDongPolygonEvents = (polygon, dong) => {
                    // 마우스 오버
                    window.kakao.maps.event.addListener(polygon, "mouseover", (mouseEvent) => {
                        polygon.setOptions({ fillColor: "#cfc2e9" });
                        //customOverlay.setContent(`<div style="padding:5px; color:black;">${dong.properties.DONG_KOR_NM}</div>`);
                        customOverlay.setPosition(mouseEvent.latLng);
                        customOverlay.setMap(map);
                    });

                    // 마우스 아웃
                    window.kakao.maps.event.addListener(polygon, "mouseout", () => {
                        polygon.setOptions({ fillColor: "#CACACB" });
                        customOverlay.setMap(null);
                    });

                    // 동 클릭 시 인포윈도우 표시
                    window.kakao.maps.event.addListener(polygon, "click", (mouseEvent) => {
                        const content = document.createElement("div");
                        content.className = "infowindow-content";
                        content.innerHTML = `
                            <p><b>${dong.properties.DONG_KOR_NM}</b>의 정치인 조회</p>
                            <div class="infowindow-button-container">
                                <button id="mayor-btn" class="infowindow-button">구청장 조회</button>
                                <button id="representative-btn" class="infowindow-button">국회의원 조회</button>
                            </div>`;

                        infowindow.setContent(content);
                        infowindow.setPosition(mouseEvent.latLng);
                        infowindow.setMap(map);

                        // 버튼 클릭 이벤트 추가
                        content.querySelector("#mayor-btn").addEventListener("click", () => navigate("/yunji"));
                        content.querySelector("#representative-btn").addEventListener("click", () => navigate("/seoin"));
                    });
                };

                // 구 폴리곤 표시 함수
                const displayArea = (coordinates, name) => {
                    const path = coordinates.map((coord) => new window.kakao.maps.LatLng(coord[1], coord[0]));

                    const polygon = new window.kakao.maps.Polygon({
                        map: map,
                        path: path,
                        strokeWeight: 2,
                        strokeColor: "#004c80",
                        strokeOpacity: 0.8,
                        fillColor: "#fff",
                        fillOpacity: 0.7,
                    });

                    regionPolygons.push(polygon);

                    // 마우스 오버 효과
                    window.kakao.maps.event.addListener(polygon, "mouseover", (mouseEvent) => {
                        polygon.setOptions({ fillColor: "#cfc2e9" });
                        //customOverlay.setContent(`<div style="padding:5px; color:black;">${name}</div>`);
                        customOverlay.setPosition(mouseEvent.latLng);
                        customOverlay.setMap(map);
                    });

                    // 마우스 아웃 효과
                    window.kakao.maps.event.addListener(polygon, "mouseout", () => {
                        polygon.setOptions({ fillColor: "#fff" });
                        customOverlay.setMap(null);
                    });

                    // 구 클릭 시 동 정보 표시
                    window.kakao.maps.event.addListener(polygon, "click", () => {
                        dongPolygons.forEach((p) => p.setMap(null));
                        dongPolygons = [];

                        const dongData = districtsJson.features.filter(
                            (dong) => dong.properties.SIG_KOR_NM === name
                        );

                        if (dongData.length > 0) {
                            map.setLevel(7);
                            displayDongAreas(dongData);
                        } else {
                            alert(`${name}의 동 정보가 없습니다.`);
                        }
                    });
                };

                geojson.features.forEach((feature) => {
                    const coordinates = feature.geometry.coordinates[0];
                    const name = feature.properties.SIG_KOR_NM;
                    displayArea(coordinates, name);
                });
            });
        };

        document.head.appendChild(script);
    }, [navigate]);

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
                <p>
                    성균관대학교 트래커스꾸<br />
                    서울특별시 종로구 성균관로 25-2<br />
                    trackerskku@g.skku.edu
                </p>
            </footer>
        </div>
    );
};

export default SelectRegion;

