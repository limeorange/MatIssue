import React, { useEffect } from "react";
import { propsType } from "./landingPage";
import styled from "styled-components";
import seoulData from "../../data/seoul.json";

interface placeType {
  place_name: string;
  road_address_name: string;
  address_name: string;
  phone: string;
  place_url: string;
}

const KakaoMap = (props: propsType) => {
  let markers: any[] = [];
  let polygons: any = new Map();

  useEffect(() => {
    if (window.kakao) {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          level: 3,
        };
        const map = new window.kakao.maps.Map(mapContainer, mapOption);
        const ps = new window.kakao.maps.services.Places();
        const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

        let districtData: { [key: string]: { lat: number; lng: number }[] } =
          {}; // 결과를 저장할 객체

        // JSON 데이터를 districtData 형식으로 변환
        seoulData.features.forEach((feature: any) => {
          let districtName = feature.properties.name; // 구 이름
          let coords = feature.geometry.coordinates[0]; // 좌표 데이터. 외곽선만 필요하므로 첫 번째 배열을 사용합니다.

          // 좌표 데이터를 원하는 형식으로 변환
          let formattedCoords = coords.map((coordPair: number[]) => {
            return { lat: coordPair[1], lng: coordPair[0] }; // 위도와 경도를 각각 lat와 lng로 변환
          });

          // 결과를 districtData 객체에 저장
          districtData[districtName] = formattedCoords;
        });

        // 카카오 맵을 그리는 함수
        function displayDistrict(
          map: any,
          name: string,
          pathData: { lat: number; lng: number }[]
        ) {
          var path = pathData.map(
            (coords) => new window.kakao.maps.LatLng(coords.lat, coords.lng)
          );

          var polygon = new window.kakao.maps.Polygon({
            map: map,
            path: path,
            strokeWeight: 2,
            strokeColor: "#004c80",
            strokeOpacity: 0.8,
            fillColor: "#000000",
            fillOpacity: 0.8,
          });

          polygons.set(name, polygon);

          var content =
            '<div class="info">' +
            '   <div class="title">' +
            name +
            "</div>" +
            '   <div class="size">총 면적 : 약 ' +
            Math.floor(polygon.getArea()) +
            " m<sup>2</sup></div>" +
            "</div>";

          var infowindow = new window.kakao.maps.InfoWindow({
            position: path[0],
            content: content,
          });

          var customOverlay = new window.kakao.maps.CustomOverlay({
            position: path[0],
            content: '<div class="area">' + name + "</div>",
          });

          window.kakao.maps.event.addListener(
            polygon,
            "mouseover",
            function (mouseEvent: { latLng: any }) {
              polygon.setOptions({ fillColor: "#09f" });
              customOverlay.setPosition(mouseEvent.latLng);
              customOverlay.setMap(map);
            }
          );

          window.kakao.maps.event.addListener(
            polygon,
            "mousemove",
            function (mouseEvent: { latLng: any }) {
              customOverlay.setPosition(mouseEvent.latLng);
            }
          );

          window.kakao.maps.event.addListener(polygon, "mouseout", function () {
            polygon.setOptions({ fillColor: "#000000" });
            customOverlay.setMap(null);
            infowindow.close();
          });

          window.kakao.maps.event.addListener(
            polygon,
            "click",
            function (mouseEvent: { latLng: any }) {
              infowindow.setPosition(mouseEvent.latLng);
              infowindow.open(map);
            }
          );
        }

        // 변환된 데이터를 이용하여 폴리곤 그리기
        Object.entries(districtData).forEach(([name, pathData]) => {
          displayDistrict(
            map,
            name,
            pathData as { lat: number; lng: number }[]
          );
        });

        function changeColor(name: string, color: string) {
          const polygon = polygons.get(name);

          if (polygon) {
            polygon.setOptions({
              fillColor: color,
            });
          }
        }

        const searchPlaces = () => {
          let keyword = props.searchKeyword;

          if (!keyword.replace(/^\s+|\s+$/g, "")) {
            console.log("키워드를 입력해주세요!");
            return false;
          }

          ps.keywordSearch(keyword, placesSearchCB);
        };

        const placesSearchCB = (data: any, status: any, pagination: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            displayPlaces(data);
            displayPagination(pagination);
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            alert("검색 결과가 존재하지 않습니다.");
            return;
          } else if (status === window.kakao.maps.services.Status.ERROR) {
            alert("검색 결과 중 오류가 발생했습니다.");
            return;
          }
        };

        const displayPlaces = (places: string | any[]) => {
          const listEl = document.getElementById("places-list"),
            resultEl = document.getElementById("search-result"),
            fragment = document.createDocumentFragment(),
            bounds = new window.kakao.maps.LatLngBounds();

          if (listEl) {
            removeAllChildNods(listEl);
          }

          removeMarker();

          for (let i = 0; i < places.length; i++) {
            let placePosition = new window.kakao.maps.LatLng(
                places[i].y,
                places[i].x
              ),
              marker = addMarker(placePosition, i, undefined),
              itemEl = getListItem(i, places[i]);

            bounds.extend(placePosition);

            ((marker, title) => {
              window.kakao.maps.event.addListener(
                marker,
                "mouseover",
                function () {
                  displayInfowindow(marker, title);
                }
              );

              window.kakao.maps.event.addListener(
                marker,
                "mouseout",
                function () {
                  infowindow.close();
                }
              );

              itemEl.onmouseover = function () {
                displayInfowindow(marker, title);
              };

              itemEl.onmouseout = function () {
                infowindow.close();
              };
            })(marker, places[i].place_name);

            fragment.appendChild(itemEl);
          }

          if (listEl) {
            listEl.appendChild(fragment);
          }

          if (resultEl) {
            resultEl.scrollTop = 0;
          }

          map.setBounds(bounds);
        };

        const getListItem = (index: number, places: placeType) => {
          let el = document.createElement("li"),
            itemStr =
              '<span class="markerbg marker_' +
              (index + 1) +
              '"></span>' +
              '<div class="info">' +
              "   <h5>" +
              places.place_name +
              "</h5>";

          if (places.road_address_name) {
            itemStr +=
              "    <span>" +
              places.road_address_name +
              "</span>" +
              '   <span class="jibun gray">' +
              places.address_name +
              "</span>";
          } else {
            itemStr += "    <span>" + places.address_name + "</span>";
          }

          itemStr +=
            '  <span class="tel">' + places.phone + "</span>" + "</div>";

          el.innerHTML = itemStr;
          el.className = "item";

          return el;
        };

        const addMarker = (position: any, idx: number, title: undefined) => {
          let imageSrc =
              "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png",
            imageSize = new window.kakao.maps.Size(36, 37),
            imgOptions = {
              spriteSize: new window.kakao.maps.Size(36, 691),
              spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10),
              offset: new window.kakao.maps.Point(13, 37),
            },
            markerImage = new window.kakao.maps.MarkerImage(
              imageSrc,
              imageSize,
              imgOptions
            ),
            marker = new window.kakao.maps.Marker({
              position: position,
              image: markerImage,
            });

          marker.setMap(map);
          markers.push(marker);

          return marker;
        };

        const removeMarker = () => {
          for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
          }
          markers = [];
        };

        const displayPagination = (pagination: {
          last: number;
          current: number;
          gotoPage: (arg0: number) => void;
        }) => {
          let paginationEl = document.getElementById("pagination"),
            fragment = document.createDocumentFragment(),
            i = pagination.current - 5;

          if (paginationEl) {
            removeAllChildNods(paginationEl);
          }

          for (; i < pagination.current + 5; i++) {
            if (i >= 1 && i <= pagination.last) {
              let el = document.createElement("a");
              el.href = "#";
              el.innerHTML = i + "";

              if (i === pagination.current) {
                el.className = "on";
              } else {
                el.onclick = (function (i) {
                  return function () {
                    pagination.gotoPage(i);
                  };
                })(i);
              }

              fragment.appendChild(el);
            }
          }

          if (paginationEl) {
            paginationEl.appendChild(fragment);
          }
        };

        const displayInfowindow = (marker: any, title: string) => {
          const content =
            '<div style="padding:5px;z-index:1;">' + title + "</div>";

          infowindow.setContent(content);
          infowindow.open(map, marker);
        };

        const removeAllChildNods = (el: HTMLElement | null) => {
          if (el) {
            while (el.hasChildNodes()) {
              el.lastChild && el.removeChild(el.lastChild);
            }
          }
        };

        searchPlaces();
      });
    }
  }, [props.searchKeyword]);

  return (
    <MapContainer>
      <MapDiv id="map" />
      <SearchResult id="search-result">
        <ResultText>
          <ResultKeyword>{props.searchKeyword}</ResultKeyword>
          검색 결과
        </ResultText>
        <ScrollWrapper>
          <PlacesList id="places-list"></PlacesList>
        </ScrollWrapper>
        <PaginationDiv id="pagination"></PaginationDiv>
      </SearchResult>
    </MapContainer>
  );
};

export default KakaoMap;

const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MapDiv = styled.div`
  width: 100%;
  max-width: 75rem;
  height: 50rem;
`;

const SearchResult = styled.div`
  width: 100%;
  max-width: 60rem;
  height: 50rem;
`;

const ResultText = styled.p`
  font-size: 16px;
  padding: 0.75rem;
  background-color: #ecf4f7;
`;

const ResultKeyword = styled.span`
  color: #007bff;
  font-weight: 700;
  margin-right: 0.25rem;
`;

const ScrollWrapper = styled.div`
  height: 43.7rem;
  overflow-y: scroll;
  padding: 1rem;

  h5 {
    font-size: 15px;
    font-weight: bold;
  }

  span {
    display: block;
    font-size: 13px;
  }

  span.jibun.gray {
    color: #84a7a1;
    margin-bottom: 0.5rem;
  }

  span.tel {
    font-size: 12px;
    color: blue;
  }
`;

const PlacesList = styled.ul`
  li {
    border-bottom: 1px solid #eee;
    padding: 1rem;
  }
`;

const PaginationDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  text-align: center;
  background-color: #ecf4f7;
  font-size: 16px;
  color: #d0d0d0;
  a.on {
    color: blue;
  }
`;
