import React, { useEffect } from "react";
import { propsType } from "./landingPage";

interface placeType {
  place_name: string;
  road_address_name: string;
  address_name: string;
  phone: string;
  place_url: string;
}

const KakaoMap = (props: propsType) => {
  let markers: any[] = [];
  console.log(window.kakao.maps);

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
    <div className="map-container">
      <div id="map" style={{ width: "600px", height: "400px" }}></div>
      <div id="search-result">
        <p className="result-text">
          <span className="result-keyword">{props.searchKeyword}</span>
          검색 결과
        </p>
        <div className="scroll-wrapper">
          <ul id="places-list"></ul>
        </div>
        <div id="pagination"></div>
      </div>
    </div>
  );
};

export default KakaoMap;
