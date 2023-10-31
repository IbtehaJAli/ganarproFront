import React, { useEffect, useState } from "react";
import { useRef } from "react";
import InfoWindow from "./infoWindow/InfoWindow";
import { render } from "react-dom";
import imageMarker from "../../assets/img/marker_new2.png";

import "./Map.css";
import { isEmpty } from "../../utils/helpers/helper";
import { current } from "@reduxjs/toolkit";

const Map = ({
  id,
  options,
  onMapLoad,
  projects,
  handleFetchProject,
  selectedLatLng,
  mapZoom,
  setLatLng,
  setZoom,
  boardListMapRef,
}) => {
  const applyDrawRef = useRef();
  const showDrawRef = useRef();
  const cancelDrawRef = useRef();
  const removeBoundaryRef = useRef();
  const mapRef = useRef();
  const polyRef = useRef();
  const [mapBounds, setMapBounds] = useState({});
  const [boundsChanged, setBoundsChanged] = useState(false);
  const [zoomChanged, setZoomChanged] = useState(false);
  const markersRef = useRef([]);

  const EnableDrawControl = (controlDiv, map) => {
    // Set CSS for the control border.
    const controlUI = document.createElement("div");
    controlUI.className = "map-button-container";
    controlUI.title = "Click to draw on the map";
    controlDiv.appendChild(controlUI);
    // Set CSS for the control interior.
    const controlText = document.createElement("button");
    controlText.className = "px-2 py-2 map-button map-button-draw";
    controlText.innerHTML = "Draw";
    controlText.id = "drawMap";

    const iconText = document.createElement("span");
    iconText.className = "draw-icon";

    controlText.appendChild(iconText);
    controlUI.appendChild(controlText);
    showDrawRef.current = controlText;
    // Setup the click event listeners: simply set the map to Chicago.
    controlText.addEventListener("click", (e) => {
      e.stopPropagation();
      disableMap(map);
      window.google.maps.event.addDomListener(
        map.getDiv(),
        "mousedown",
        function (e) {
          e.stopPropagation();
          const classList = e.target.classList;
          const notAllowedClass = [
            "map-button",
            "map-button-container",
            "map-button-cancel",
          ];

          let filteredArray = [];
          classList.forEach((value) => {
            if (notAllowedClass.includes(value)) {
              filteredArray.push(value);
            }
          });
          if (filteredArray.length === 0) {
            drawFreeHand(map);
          }
        }
      );
      e.stopPropagation();
      controlText.disabled = true;
      const cancelDrawControlDiv = document.createElement("div");
      const applyDrawControlDiv = document.createElement("div");
      const RemoveBoundaryControlDiv = document.createElement("div");
      RemoveBoundaryControl(controlUI, map);
      CancelDrawControl(controlUI, map, controlText);
      ApplyDrawControl(controlUI, map);
      map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(
        RemoveBoundaryControlDiv
      );
      map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(
        cancelDrawControlDiv,
        applyDrawControlDiv
      );
      map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(
        applyDrawControlDiv
      );
    });
  };

  function CancelDrawControl(controlDiv, map, showDrawButton) {
    const controlText = document.createElement("button");
    controlText.className = "px-2 py-2 map-button-cancel";
    controlText.innerHTML = "Cancel";

    controlDiv.appendChild(controlText);
    cancelDrawRef.current = controlText;

    controlText.addEventListener("click", (e) => {
      e.stopPropagation();
      hideDrawManager(map);
      applyDrawRef.current.style.display = "none";
      cancelDrawRef.current.style.display = "none";
      removeBoundaryRef.current.style.display = "none";
      showDrawRef.current.disabled = false;
    });
  }
  const onScriptLoad = (mapDom = null) => {
    let map = mapDom;
    if (!mapDom) {
      map = new window.google.maps.Map(document.getElementById(id), options);
    }

    if (isEmpty(selectedLatLng)) {
      return;
    }

    map.setOptions({
      mapTypeControl: false,
      center: {
        lat: parseFloat(selectedLatLng?.latitude),
        lng: parseFloat(selectedLatLng?.longitude),
      },
      zoom: mapZoom,
    });
    onMapLoad(map);

    const enableDrawControlDiv = document.createElement("div");
    EnableDrawControl(enableDrawControlDiv, map);
    map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(
      enableDrawControlDiv
    );
    mapRef.current = map;
    boardListMapRef.current = map;
    addMarkers(projects, map);
  };

  function ApplyDrawControl(controlDiv, map) {
    const controlText = document.createElement("button");
    controlText.className = "px-2 py-2 map-button-apply";
    controlText.innerHTML = "Apply";

    controlDiv.appendChild(controlText);
    applyDrawRef.current = controlText;
    // Setup the click event listeners: simply set the map to Chicago.
    controlText.addEventListener("click", (e) => {
      e.stopPropagation();
      applyShape();
    });
  }

  function RemoveBoundaryControl(controlDiv, map) {
    const controlText = document.createElement("button");
    controlText.className = "px-2 py-2 map-button-boundary";
    controlText.innerHTML = "Remove Boundary";

    controlDiv.appendChild(controlText);
    removeBoundaryRef.current = controlText;

    controlText.addEventListener("click", (e) => {
      e.stopPropagation();
      hideDrawManager(map);
      removeBoundary(map);
    });
  }

  useEffect(() => {
    createMap();
  }, []);

  useEffect(() => {
    createMap();
    clearMarkers();
    addMarkers(projects, mapRef.current);
  }, [projects]);

  useEffect(() => {
    if (!isEmpty(mapBounds) && boundsChanged) {
      clearMarkers();
      handleFetchProject(JSON.parse(JSON.stringify(mapBounds)));
    }
  }, [mapBounds]);

  useEffect(() => {
    if (!isEmpty(mapBounds) && zoomChanged) {
      clearMarkers();
      handleFetchProject(JSON.parse(JSON.stringify(mapBounds)));
    }
  }, [mapZoom]);

  // Function to remove all markers from the map
  const clearMarkers = () => {
    markersRef.current.forEach((marker) => {
      marker.setMap(null); // Remove marker from map
    });
    markersRef.current = []; // Clear the list of tracked markers
  };

  const drawFreeHand = (map) => {
    //the polygon
    let poly = new window.google.maps.Polyline({
      map: map,
      clickable: false,
      strokeColor: "#276FB4",
      strokeOpacity: 1.0,
      fillColor: "#276FB4",
      fillOpacity: 1,
    });

    //move-listener
    let move = window.google.maps.event.addListener(
      map,
      "mousemove",
      function (e) {
        poly.getPath().push(e.latLng);
      }
    );
    polyRef.current = poly;
    //mouseup-listener
    window.google.maps.event.addListenerOnce(map, "mouseup", function (e) {
      window.google.maps.event.removeListener(move);
      let path = poly.getPath();
      poly.setMap(null);
      poly = new window.google.maps.Polygon({
        map: map,
        path: path,
        strokeColor: "#276FB4",
        strokeOpacity: 1.0,
        fillColor: "#276FB4",
        fillOpacity: 0.3,
      });

      polyRef.current = poly;
      window.google.maps.event.clearListeners(map.getDiv(), "mousedown");

      enable(map);
    });
  };

  const disable = (map) => {
    map.setOptions({
      draggable: false,
      zoomControl: false,
      scrollwheel: false,
      disableDoubleClickZoom: false,
    });
  };

  const removeBoundary = (map) => {
    map.setOptions({
      draggable: false,
      zoomControl: false,
      scrollwheel: false,
      disableDoubleClickZoom: false,
      zoom: 3,
      center: { lat: 44.3258932, lng: -93.955691 },
    });
  };

  const disableMap = (map) => {
    map.setOptions({
      draggable: false,
      zoomControl: false,
      scrollwheel: false,
      disableDoubleClickZoom: false,
    });
  };

  const enable = (map) => {
    map.setOptions({
      draggable: true,
      zoomControl: true,
      scrollwheel: true,
      disableDoubleClickZoom: true,
    });
  };

  const hideDrawManager = (map) => {
    polyRef.current?.setMap(null);
    disable(map);
  };

  const applyShape = () => {
    getPathVariableCode(window.google.maps);
  };

  const addMarkers = (results, map) => {
    if (!map) {
      return;
    }
    const markers = [];
    let bound = map.getBounds();
    console.log("Results >>>> ", results);
    for (let i = 0; i < results?.length; i++) {
      if (!results[i].longitude || !results[i].latitude) {
        continue;
      }
      const longitude = results[i].longitude;
      const latitude = results[i].latitude;
      const latLng = new window.google.maps.LatLng(latitude, longitude);
      // console.log("Lat long within the Bounds >>> ", bound.contains(latLng));

      const marker = new window.google.maps.Marker({
        position: latLng,
        icon: imageMarker,
        map: map,
        style: {
          height: 13,
          width: 13,
        },
        // label: results[i]?.name[0]
      });
      markersRef.current.push(marker);
      marker.addListener("click", (e) => {
        createInfoWindow(e, map, marker, results[i]);
      });
      markers.push(marker);
    }

    let bounds;
    map?.addListener("dragend", () => {
      bounds = map.getBounds();
      console.log(bounds);
      const center = map.getCenter();

      setLatLng({ latitude: center.lat(), longitude: center.lng() });

      setMapBounds(bounds);
      setBoundsChanged(true);
      setZoomChanged(false);
      // setMapLoading(false);
    });

    let zoom;
    map?.addListener("zoom_changed", () => {
      bounds = map.getBounds();
      zoom = map.getZoom();
      const center = map.getCenter();

      if (center) {
        setLatLng({ latitude: center.lat(), longitude: center.lng() });
      }

      setMapBounds(bounds);
      setZoom(zoom);
      setBoundsChanged(false);
      setZoomChanged(true);
    });

    // new window.MarkerClusterer(map, markers, {
    //   // imagePath:
    //   // "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
    //   styles: [
    //     {
    //       url: `${window.location.origin}/marker.png`,
    //       height: 52,
    //       width: 52,
    //       textColor: "#ffff",
    //     },
    //   ],
    // });
  };

  const createInfoWindow = (e, map, marker, project) => {
    const infoWindow = new window.google.maps.InfoWindow({
      content: `<div id="${project.id}"></div>`,
      position: { lat: e.latLng.lat(), lng: e.latLng.lng() },
    });
    infoWindow.addListener("domready", (e) => {
      render(
        <InfoWindow project={project} />,
        document.getElementById(project.id)
      );
    });
    infoWindow.open(map, marker);
  };

  const getPathVariableCode = () => {
    const bounds = new window.google.maps.LatLngBounds();

    let polygon = polyRef.current;

    try {
      polygon?.getPaths().forEach(function (path) {
        path.forEach(function (latlng) {
          bounds.extend(latlng);
        });
      });
      mapRef.current.fitBounds(bounds);
      // handleFetchProject(JSON.stringify(bounds.toJSON()));
      handleFetchProject(JSON.parse(JSON.stringify(bounds.toJSON())));
    } catch (error) {
      return;
    }
  };

  const createMap = () => {
    if (!window.google) {
      const googleMapScript = document.createElement("script");
      googleMapScript.type = "text/javascript";
      googleMapScript.src = `https://maps.google.com/maps/api/js?key=${process.env.REACT_APP_MAP_API_KEY}&libraries=drawing,places`;
      const mapScript = document.getElementsByTagName("script")[0];
      mapScript.parentNode.insertBefore(googleMapScript, mapScript);
      // Below is important.
      //We cannot access google.maps until it's finished loading
      googleMapScript.addEventListener("load", (e) => {
        onScriptLoad();
      });
    } else {
      onScriptLoad(mapRef.current);
    }
  };

  return <div style={{ width: "auto", height: "100%" }} id={id} />;
};

export default Map;
