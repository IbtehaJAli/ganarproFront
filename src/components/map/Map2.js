import React, { useEffect } from "react";
import { useRef } from "react";
import InfoWindow from "./infoWindow/InfoWindow";
import { render } from "react-dom";

import "./Map.css";

const Map = ({ id, options, onMapLoad, projects }) => {
  const drawingRef = useRef();
  const applyDrawRef = useRef();
  const mapRef = useRef();
  const polyRef = useRef();

  const EnableDrawControl = (controlDiv, map) => {
    // Set CSS for the control border.
    const controlUI = document.createElement("div");
    controlUI.className = "map-button-container";
    controlUI.title = "Click to draw on the map";
    controlDiv.appendChild(controlUI);
    // Set CSS for the control interior.
    const controlText = document.createElement("button");
    controlText.className = "btn btn-primary px-2 py-2 map-button";
    controlText.innerHTML = "Draw";
    controlUI.appendChild(controlText);
    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener("click", () => {
      // drawingManager(map);
      drawPolyLine(map);

      // disable();

      window.google.maps.event.addDomListener(
        map.getDiv(),
        "mousedown",
        function (e) {
          drawPolyLine(map);
        }
      );

      controlText.disabled = true;
      const cancelDrawControlDiv = document.createElement("div");
      const applyDrawControlDiv = document.createElement("div");
      CancelDrawControl(cancelDrawControlDiv, map, controlText);
      ApplyDrawControl(applyDrawControlDiv, map);
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
    // Set CSS for the control border.
    const controlUI = document.createElement("div");
    controlUI.title = "Click to recenter the map";
    controlUI.className = "map-button-container";
    controlDiv.appendChild(controlUI);
    // Set CSS for the control interior.
    const controlText = document.createElement("button");
    controlText.className = "btn btn-danger px-2 py-2 map-button";
    controlText.innerHTML = "Cancel";
    controlUI.appendChild(controlText);
    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener("click", () => {
      hideDrawManager(map);
      showDrawButton.disabled = false;
      controlUI.style.display = "none";
      applyDrawRef.current.style.display = "none";
    });
  }
  const onScriptLoad = () => {
    const map = new window.google.maps.Map(
      document.getElementById(id),
      options
    );
    onMapLoad(map);
    const enableDrawControlDiv = document.createElement("div");
    EnableDrawControl(enableDrawControlDiv, map);
    map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(
      enableDrawControlDiv
    );
    mapRef.current = map;
    addMarkers(projects, map);
  };

  function ApplyDrawControl(controlDiv, map) {
    const controlUI = document.createElement("div");
    controlUI.className = "map-button-container";
    controlUI.title = "Click to draw on the map";
    controlDiv.appendChild(controlUI);
    // Set CSS for the control interior.
    const controlText = document.createElement("button");
    controlText.className = "btn btn-success px-2 py-2 map-button";
    controlText.innerHTML = "Apply";
    controlUI.appendChild(controlText);
    applyDrawRef.current = controlUI;
    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener("click", () => {
      applyShape();
    });
  }

  useEffect(() => {
    createMap();
  }, [projects]);

  const drawPolyLine = (map) => {
    let poly = new window.google.maps.Polyline({
      strokeColor: "#000000",
      strokeOpacity: 1.0,
      fillColor: "#ffff00",
      fillOpacity: 1,
      strokeWeight: 5,
      clickable: false,
      editable: true,
      zIndex: 1,
      marginTop: "2rem",
    });
    poly.setOptions({
      markerOptions: {
        icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
      },
      clickable: false,
    });
    polyRef.current = poly;
    poly.setMap(map);
    // Add a listener for the click event
    // map.addListener("click", addLatLng);

    const move = map.addListener(map, "mousemove", addLatLng);

    map.addListener(map, "mouseup", function (e) {
      new window.google.maps.event.removeListener(move);
      const path = poly.getPath();
      poly.setMap(null);
      poly = new window.google.maps.Polygon({ map: map, path: path });

      new window.google.maps.event.clearListeners(map.getDiv(), "mousedown");

      enable();
    });
  };

  const disable = () => {
    mapRef.current.setOptions({
      draggable: false,
      zoomControl: false,
      scrollwheel: false,
      disableDoubleClickZoom: false,
    });
  };

  const enable = () => {
    mapRef.current.setOptions({
      draggable: true,
      zoomControl: true,
      scrollwheel: true,
      disableDoubleClickZoom: true,
    });
  };

  const drawingManager = (map) => {
    const drawingManager = new window.google.maps.drawing.DrawingManager({
      drawingMode: window.google.maps.drawing.OverlayType.MARKER,
      drawingControl: true,
      drawingControlOptions: {
        position: window.google.maps.ControlPosition.TOP_LEFT,
        drawingModes: [window.google.maps.drawing.OverlayType.POLYLINE],
      },
      markerOptions: {
        icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
      },
      polylineOptions: {
        fillColor: "#ffff00",
        fillOpacity: 1,
        strokeWeight: 5,
        clickable: false,
        editable: true,
        zIndex: 1,
        marginTop: "2rem",
      },
    });
    drawingRef.current = drawingManager;
    drawingManager.setMap(map);
    map.addListener("click", addLatLng);
    return drawingManager;
  };

  const hideDrawManager = (map) => {
    // drawingRef.current.setMap(null);
    polyRef.current.setMap(null);
    disable();
  };

  const applyShape = () => {
    getPathVariableCode(window.google.maps);
  };

  const addMarkers = (results, map) => {
    for (let i = 0; i < results?.length; i++) {
      const longitude = results[i].longitude;
      const latitude = results[i].latitude;
      const latLng = new window.google.maps.LatLng(latitude, longitude);
      const marker = new window.google.maps.Marker({
        position: latLng,
        map: map,
      });
      marker.addListener("click", (e) => {
        createInfoWindow(e, map, marker, results[i]);
      });
    }
  };

  const createInfoWindow = (e, map, marker, project) => {
    const infoWindow = new window.google.maps.InfoWindow({
      content: '<div id="infoWindow"></div>',
      position: { lat: e.latLng.lat(), lng: e.latLng.lng() },
    });
    infoWindow.addListener("domready", (e) => {
      render(
        <InfoWindow project={project} />,
        document.getElementById("infoWindow")
      );
    });
    infoWindow.open(map, marker);
  };

  const getPathVariableCode = (line) => {
    var codeStr = "  var linePath = [\n";
    // var pathArr = line.getPath();
    var pathArr = polyRef.current.getPath();
    for (var i = 0; i < pathArr.length; i++) {
      codeStr +=
        "    {lat: " +
        pathArr.getAt(i).lat() +
        ", lng: " +
        pathArr.getAt(i).lng() +
        "}";
      if (i !== pathArr.length - 1) {
        codeStr += ",\n";
      }
    }

    codeStr += "\n  ];";

    //the coordinates path it´s print on the console of the browser
  };

  // Handles click events on a map, and adds a new point to the Polyline.
  function addLatLng(event) {
    const path = polyRef.current.getPath();
    path.push(event.latLng);
  }

  const createMap = () => {
    if (!window.google) {
      const googleMapScript = document.createElement("script");
      googleMapScript.type = "text/javascript";
      googleMapScript.src = `https://maps.google.com/maps/api/js?key=${process.env.REACT_APP_MAP_API_KEY}&libraries=drawing`;
      const mapScript = document.getElementsByTagName("script")[0];
      mapScript.parentNode.insertBefore(googleMapScript, mapScript);
      // Below is important.
      //We cannot access google.maps until it's finished loading
      googleMapScript.addEventListener("load", (e) => {
        onScriptLoad();
      });
    } else {
      onScriptLoad();
    }
  };

  return <div style={{ width: "auto", height: "100%" }} id={id} />;
};

export default Map;
