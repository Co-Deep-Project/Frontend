import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import geojson from "../lib/data/seoul_map.json";
import districtsJson from "../lib/data/seoul_districts.json";
import "./SelectRegion.css";
import centerData from "../lib/data/seoul_gu_centers.json";

const SelectRegion = () => {
    const navigate = useNavigate();
    const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;

    useEffect(() => {
        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&autoload=false`;
        script.async = true;

        let goBackButton; // "구 다시 선택하기" 버튼을 전역 변수로 선언

        script.onload = () => {
            window.kakao.maps.load(() => {
                const mapContainer = document.getElementById("politic-map");
                if (!mapContainer) {
                    console.error("Map container not found!");
                    return;
                }
                const mapOption = {
                    center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
                    level: 9, // 초기 확대 레벨
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
                                strokeColor: "#5C5B5C",
                                strokeOpacity: 0.8,
                                fillColor: "#CACACB",
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
                    window.kakao.maps.event.addListener(polygon, "mouseover", (mouseEvent) => {
                        polygon.setOptions({ fillColor: "#b29ddb" });
                        customOverlay.setPosition(mouseEvent.latLng);
                        customOverlay.setMap(map);
                    });

                    window.kakao.maps.event.addListener(polygon, "mouseout", () => {
                        polygon.setOptions({ fillColor: "#CACACB" });
                        customOverlay.setMap(null);
                    });

                    window.kakao.maps.event.addListener(polygon, "click", (mouseEvent) => {
                        const districtName = dong.properties.SIG_KOR_NM;

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

                        content.querySelector("#mayor-btn").addEventListener("click", () => {
                            if (districtName !== "종로구") {
                                alert("서비스 준비중입니다.");
                                return;
                            }
                            navigate("/yunji");
                        });

                        content.querySelector("#representative-btn").addEventListener("click", () => {
                            if (districtName !== "종로구") {
                                alert("서비스 준비중입니다.");
                                return;
                            }
                            navigate("/seoin");
                        });
                    });
                };

                // 구 폴리곤 표시 함수
                const displayArea = (coordinates, name) => {
                    if (!coordinates || coordinates.length === 0) {
                        console.error(`Invalid coordinates for region: ${name}`);
                        return;
                    }

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

                    window.kakao.maps.event.addListener(polygon, "mouseover", (mouseEvent) => {
                        polygon.setOptions({ fillColor: "#cfc2e9" });
                        customOverlay.setPosition(mouseEvent.latLng);
                        customOverlay.setMap(map);
                    });

                    window.kakao.maps.event.addListener(polygon, "mouseout", () => {
                        polygon.setOptions({ fillColor: "#fff" });
                        customOverlay.setMap(null);
                    });

                    window.kakao.maps.event.addListener(polygon, "click", () => {
                        regionPolygons.forEach((p) => p.setMap(null));
                        regionPolygons = [];

                        const center = centerData.centers.find((item) => item.name === name);
                        if (center) {
                            const centerPosition = new window.kakao.maps.LatLng(center.lat, center.lng);
                            map.setCenter(centerPosition);
                        }

                        const dongData = districtsJson.features.filter(
                            (dong) => dong.properties.SIG_KOR_NM === name
                        );

                        if (dongData.length > 0) {
                            map.setLevel(7);
                            displayDongAreas(dongData);
                            addGoBackButton();
                        } else {
                            alert(`${name}의 동 정보가 없습니다.`);
                        }
                    });
                };

                // "구 다시 선택하기" 버튼 추가
                const addGoBackButton = () => {
                    if (goBackButton) {
                        return;
                    }

                    goBackButton = document.createElement("button");
                    goBackButton.innerText = "구 다시 선택하기";
                    goBackButton.className = "back-button";
                    goBackButton.onclick = () => resetToRegions();
                    document.body.appendChild(goBackButton);
                };

                // 구 다시 선택하기 상태로 리셋
                const resetToRegions = () => {
                    dongPolygons.forEach((p) => p.setMap(null));
                    dongPolygons = [];

                    infowindow.close();

                    map.setCenter(new window.kakao.maps.LatLng(37.566826, 126.9786567));
                    map.setLevel(9);

                    if (goBackButton) {
                        goBackButton.remove();
                        goBackButton = null;
                    }

                    geojson.features.forEach((feature) => {
                        const coordinates = feature.geometry.coordinates[0];
                        const name = feature.properties.SIG_KOR_NM;

                        if (!coordinates || coordinates.length === 0) {
                            console.error(`Invalid coordinates for region: ${name}`);
                            return;
                        }

                        displayArea(coordinates, name);
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

        // Cleanup function: 다른 페이지로 이동할 때 "구 다시 선택하기" 버튼 제거
        return () => {
            if (goBackButton) {
                goBackButton.remove();
            }
        };
    }, [navigate]);

    return (
        <div className="container">
            <header className="header">
                <img src="/images/logo.png" alt="PoliTracker" className="logo" onClick={() => navigate("/")} />
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